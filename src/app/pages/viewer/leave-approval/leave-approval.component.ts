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
// LEAVE INTERFACE
// =====================================================

export interface LeaveApproval {

  // ===================================================
  // LEAVE ID
  // ===================================================

  id: string;


  // ===================================================
  // EMPLOYEE NAME
  // ===================================================

  employee: string;


  // ===================================================
  // EMPLOYEE EMAIL
  // ===================================================

  email: string;


  // ===================================================
  // REPORTING MANAGER
  // ===================================================

  requestedTo: string;


  // ===================================================
  // LEAVE TYPE
  // ===================================================

  leaveType: string;


  // ===================================================
  // LEAVE FROM DATE
  // ===================================================

  from: string;


  // ===================================================
  // LEAVE TO DATE
  // ===================================================

  to: string;


  // ===================================================
  // LEAVE REASON
  // ===================================================

  reason: string;


  // ===================================================
  // LEAVE STATUS
  // ===================================================

  status: string;

}


// =====================================================
// COMPONENT
// =====================================================

@Component({

  selector: 'app-leave-approval',

  templateUrl: './leave-approval.component.html',

  styleUrls: [
    './leave-approval.component.css'
  ]

})
export class LeaveApprovalComponent
  implements OnInit {


  // ===================================================
  // ALL LEAVE REQUESTS
  // ===================================================
  //
  // Is array ke andar Admin API se aane wali
  // saari leaves store hongi.
  //
  // PENDING
  // APPROVED
  // REJECTED
  //
  // ===================================================

  leaveRequests: LeaveApproval[] = [];


  // ===================================================
  // LOADING STATE
  // ===================================================
  //
  // API call ke time true rahega.
  //
  // ===================================================

  loading = false;


  // ===================================================
  // ERROR MESSAGE
  // ===================================================
  //
  // Agar API fail hoti hai to yahan error message
  // store hoga.
  //
  // ===================================================

  errorMessage = '';


  // ===================================================
  // CONSTRUCTOR
  // ===================================================

  constructor(
    private leaveService: LeaveApprovalService
  ) {}


  // ===================================================
  // ON INIT
  // ===================================================
  //
  // Component load hote hi saari leaves fetch hongi.
  //
  // ===================================================

  ngOnInit(): void {

    this.loadAllLeaves();

  }


  // ===================================================
  // GET ALL LEAVES - ADMIN
  // ===================================================
  //
  // ONLY API USED BY ADMIN PAGE:
  //
  // GET /api/v1/leaves/admin
  //
  // Ye API saari leaves return karti hai:
  //
  // PENDING
  // APPROVED
  // REJECTED
  //
  // Is page par approve/reject API call nahi hogi.
  //
  // ===================================================

  loadAllLeaves(): void {

    // =================================================
    // START LOADING
    // =================================================

    this.loading = true;


    // =================================================
    // CLEAR PREVIOUS ERROR
    // =================================================

    this.errorMessage = '';


    // =================================================
    // CALL ADMIN API
    // =================================================

    this.leaveService
      .getAllLeaves()
      .subscribe({

        // =============================================
        // SUCCESS
        // =============================================

        next: (
          response: any[]
        ) => {

          // ===========================================
          // CONSOLE LOG
          // ===========================================

          console.log(
            'ALL LEAVES:',
            response
          );


          // ===========================================
          // MAP API RESPONSE
          // ===========================================
          //
          // Backend se:
          //
          // name
          //
          // aa raha hai.
          //
          // Hum UI ke liye:
          //
          // employee
          //
          // use kar rahe hain.
          //
          // ===========================================

          this.leaveRequests =
            (response || []).map(
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
                // EMAIL
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
                  this.formatLeaveType(
                    leave.leaveType
                  ),


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


          // ===========================================
          // STOP LOADING
          // ===========================================

          this.loading = false;

        },


        // =============================================
        // ERROR
        // =============================================

        error: (
          error: HttpErrorResponse
        ) => {

          // ===========================================
          // CONSOLE ERROR
          // ===========================================

          console.error(
            'GET ALL LEAVES ERROR:',
            error
          );


          // ===========================================
          // CLEAR DATA
          // ===========================================

          this.leaveRequests = [];


          // ===========================================
          // STOP LOADING
          // ===========================================

          this.loading = false;


          // ===========================================
          // ERROR MESSAGE
          // ===========================================

          this.errorMessage =
            error?.error?.responseMessage ||
            error?.error?.message ||
            'Unable to load leave requests.';

        }

      });

  }


  // ===================================================
  // FORMAT LEAVE TYPE
  // ===================================================
  //
  // Example:
  //
  // CASUAL
  //      ↓
  // Casual
  //
  // SICK
  //      ↓
  // Sick
  //
  // MATERNITY
  //      ↓
  // Maternity
  //
  // ===================================================

  formatLeaveType(
    leaveType: string
  ): string {

    // =================================================
    // EMPTY CHECK
    // =================================================

    if (!leaveType) {

      return '';

    }


    // =================================================
    // FORMAT
    // =================================================

    return leaveType
      .toLowerCase()
      .replace(
        /\b\w/g,
        character =>
          character.toUpperCase()
      );

  }


  // ===================================================
  // PENDING COUNT
  // ===================================================
  //
  // Total PENDING leaves.
  //
  // ===================================================

  get pendingCount(): number {

    return this.leaveRequests
      .filter(
        leave =>
          leave.status?.toUpperCase() === 'PENDING'
      )
      .length;

  }


  // ===================================================
  // APPROVED COUNT
  // ===================================================
  //
  // Total APPROVED leaves.
  //
  // ===================================================

  get approvedCount(): number {

    return this.leaveRequests
      .filter(
        leave =>
          leave.status?.toUpperCase() === 'APPROVED'
      )
      .length;

  }


  // ===================================================
  // REJECTED COUNT
  // ===================================================
  //
  // Total REJECTED leaves.
  //
  // ===================================================

  get rejectedCount(): number {

    return this.leaveRequests
      .filter(
        leave =>
          leave.status?.toUpperCase() === 'REJECTED'
      )
      .length;

  }

}