
import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  LeaveApprovalService
} from '../../../services/leave-approval.service';


// =====================================================
// BACKEND RESPONSE INTERFACE
// =====================================================
//
// Ye interface pehle service file me tha.
//
// Ab service file se interface hata diya hai,
// isliye Employee component me hi rakha gaya hai.
//
// Ye exactly backend API response ke according hai.
//
// =====================================================

export interface LeaveApprovalResponse {

  id: string;

  name: string;

  email: string;

  requestedTo: string;

  leaveType: string;

  from: string;

  to: string;

  reason: string;

  status: string;

}


// =====================================================
// FRONTEND INTERFACE
// =====================================================
//
// Backend me employee ka naam "name" hai.
//
// UI ke liye hum ise "employee" ke naam se
// use kar rahe hain.
//
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

                  // =====================================
                  // ID
                  // =====================================

                  id:
                    leave.id,


                  // =====================================
                  // EMPLOYEE NAME
                  // =====================================

                  employee:
                    leave.name,


                  // =====================================
                  // EMPLOYEE EMAIL
                  // =====================================

                  email:
                    leave.email,


                  // =====================================
                  // REPORTING MANAGER
                  // =====================================

                  requestedTo:
                    leave.requestedTo,


                  // =====================================
                  // LEAVE TYPE
                  // =====================================

                  leaveType:
                    leave.leaveType,


                  // =====================================
                  // FROM DATE
                  // =====================================

                  from:
                    leave.from,


                  // =====================================
                  // TO DATE
                  // =====================================

                  to:
                    leave.to,


                  // =====================================
                  // REASON
                  // =====================================

                  reason:
                    leave.reason,


                  // =====================================
                  // STATUS
                  // =====================================

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
    // ===================================================
    //
    // PATCH
    // /api/v1/leaves/{id}/approve
    //
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
          // REMOVE APPROVED LEAVE
          // FROM PENDING LIST
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
    // ===================================================
    //
    // PATCH
    // /api/v1/leaves/{id}/reject
    //
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
          // REMOVE REJECTED LEAVE
          // FROM PENDING LIST
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
