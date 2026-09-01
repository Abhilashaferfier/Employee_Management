import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  LeaveApprovalService,
  LeaveApprovalResponse
} from '../../../services/leave-approval.service';


// =====================================================
// FRONTEND INTERFACE
// =====================================================

export interface LeaveApproval {

  id: string;

  employee: string;

  email: string;

  requestedTo: string;

  leaveType: string;

  from: string;

  to: string;

  reason: string;

  status: string;

}


// =====================================================
// COMPONENT
// =====================================================

@Component({

  selector:
    'app-leave-approval',

  templateUrl:
    './leave-approval.component.html',

  styleUrls:
    ['./leave-approval.component.css']

})
export class LeaveApprovalComponent
  implements OnInit {


  // =====================================================
  // LEAVE REQUESTS
  // =====================================================

  leaveRequests: LeaveApproval[] = [];


  // =====================================================
  // LOGGED-IN USER EMAIL
  // =====================================================

  loggedInUserEmail = '';


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;


  // =====================================================
  // ACTION LOADING
  // =====================================================

  actionLoadingId: string | null = null;


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  errorMessage = '';


  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

  successMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private leaveService:
      LeaveApprovalService
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.loadPendingLeaves();

  }


  // =====================================================
  // LOAD PENDING LEAVES
  // =====================================================

  loadPendingLeaves(): void {

    this.loading = true;

    this.errorMessage = '';

    this.successMessage = '';


    // ===================================================
    // GET LOGGED-IN USER EMAIL
    // ===================================================

    const storedEmail =
      localStorage.getItem('email');


    console.log(
      'Logged-in user email:',
      storedEmail
    );


    // ===================================================
    // EMAIL NOT FOUND
    // ===================================================

    if (!storedEmail) {

      this.loading = false;

      this.leaveRequests = [];

      this.errorMessage =
        'User email not found. Please login again.';

      return;

    }


    // ===================================================
    // NORMALIZE EMAIL
    // ===================================================

    this.loggedInUserEmail =
      storedEmail
        .trim()
        .toLowerCase();


    // ===================================================
    // GET PENDING LEAVES API
    // ===================================================

    this.leaveService
      .getPendingLeaves()
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: LeaveApprovalResponse[]
        ) => {

          console.log(
            'PENDING LEAVES API RESPONSE:',
            response
          );


          // =============================================
          // FILTER ONLY LEAVES WHERE
          // LOGGED-IN USER IS MANAGER
          // =============================================

          this.leaveRequests =
            (response || [])

              .filter(
                leave => {

                  const requestedTo =
                    (
                      leave.requestedTo ||
                      ''
                    )
                      .trim()
                      .toLowerCase();


                  return (
                    requestedTo ===
                    this.loggedInUserEmail
                  );

                }
              )


              // =========================================
              // MAP BACKEND DATA TO FRONTEND INTERFACE
              // =========================================

              .map(
                leave => ({

                  id:
                    leave.id,

                  employee:
                    leave.name,

                  email:
                    leave.email,

                  requestedTo:
                    leave.requestedTo,

                  leaveType:
                    leave.leaveType,

                  from:
                    leave.from,

                  to:
                    leave.to,

                  reason:
                    leave.reason,

                  status:
                    leave.status

                })
              );


          console.log(
            'MY TEAM PENDING LEAVES:',
            this.leaveRequests
          );


          this.loading = false;

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'GET PENDING LEAVES ERROR:',
            error
          );


          this.leaveRequests = [];

          this.loading = false;


          this.errorMessage =
            error?.error?.responseMessage ||
            error?.error?.message ||
            'Unable to load pending leave requests.';

        }

      });

  }


  // =====================================================
  // PENDING COUNT
  // =====================================================

  get pendingCount(): number {

    return this.leaveRequests

      .filter(
        leave =>
          leave.status === 'PENDING'
      )

      .length;

  }


  // =====================================================
  // APPROVE LEAVE
  // =====================================================

  approve(
    request: LeaveApproval
  ): void {

    console.log(
      'APPROVE REQUEST:',
      request
    );


    // ===================================================
    // PREVENT DUPLICATE CLICK
    // ===================================================

    if (this.actionLoadingId) {

      return;

    }


    // ===================================================
    // SET CURRENT ACTION LOADING
    // ===================================================

    this.actionLoadingId =
      request.id;


    this.errorMessage = '';

    this.successMessage = '';


    // ===================================================
    // APPROVE API
    //
    // Backend API:
    //
    // PATCH
    // /api/v1/leaves/{id}/approve
    //
    // Here request.id is used.
    // ===================================================

    this.leaveService
      .approveLeave(
        request.id
      )
      .subscribe({

        // =============================================
        // SUCCESS
        // =============================================

        next: (
          response: LeaveApprovalResponse
        ) => {

          console.log(
            'LEAVE APPROVED:',
            response
          );


          // ===========================================
          // SUCCESS MESSAGE
          // ===========================================

          this.successMessage =
            'Leave request approved successfully.';


          // ===========================================
          // STOP ACTION LOADING
          // ===========================================

          this.actionLoadingId =
            null;


          // ===========================================
          // REMOVE APPROVED LEAVE FROM PENDING LIST
          // ===========================================

          this.leaveRequests =
            this.leaveRequests.filter(
              leave =>
                leave.id !== request.id
            );

        },


        // =============================================
        // ERROR
        // =============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'APPROVE LEAVE ERROR:',
            error
          );


          this.errorMessage =
            error?.error?.responseMessage ||
            error?.error?.message ||
            'Unable to approve leave request.';


          this.actionLoadingId =
            null;

        }

      });

  }


  // =====================================================
  // REJECT LEAVE
  // =====================================================

  reject(
    request: LeaveApproval
  ): void {

    console.log(
      'REJECT REQUEST:',
      request
    );


    // ===================================================
    // PREVENT DUPLICATE CLICK
    // ===================================================

    if (this.actionLoadingId) {

      return;

    }


    // ===================================================
    // SET CURRENT ACTION LOADING
    // ===================================================

    this.actionLoadingId =
      request.id;


    this.errorMessage = '';

    this.successMessage = '';


    // ===================================================
    // REJECT API
    //
    // PATCH
    // /api/v1/leaves/{id}/reject
    // ===================================================

    this.leaveService
      .rejectLeave(
        request.id
      )
      .subscribe({

        // =============================================
        // SUCCESS
        // =============================================

        next: (
          response: LeaveApprovalResponse
        ) => {

          console.log(
            'LEAVE REJECTED:',
            response
          );


          // ===========================================
          // SUCCESS MESSAGE
          // ===========================================

          this.successMessage =
            'Leave request rejected successfully.';


          // ===========================================
          // STOP ACTION LOADING
          // ===========================================

          this.actionLoadingId =
            null;


          // ===========================================
          // REMOVE REJECTED LEAVE FROM PENDING LIST
          // ===========================================

          this.leaveRequests =
            this.leaveRequests.filter(
              leave =>
                leave.id !== request.id
            );

        },


        // =============================================
        // ERROR
        // =============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'REJECT LEAVE ERROR:',
            error
          );


          this.errorMessage =
            error?.error?.responseMessage ||
            error?.error?.message ||
            'Unable to reject leave request.';


          this.actionLoadingId =
            null;

        }

      });

  }

}