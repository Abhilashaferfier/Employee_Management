import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  LeaveRequestsService
} from '../../../services/leave-request.service';


// =====================================================
// LEAVE REQUEST INTERFACE
// Only fields required by frontend
// =====================================================

export interface LeaveRequest {

  id: string;

  name: string;

  email: string;

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
    'app-leave-requests',

  templateUrl:
    './leave-requests.component.html',

  styleUrls:
    ['./leave-requests.component.css']

})
export class LeaveRequestsComponent
  implements OnInit {


  // =====================================================
  // LEAVE REQUESTS
  // =====================================================

  leaveRequests:
    LeaveRequest[] = [];


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;

  applyLoading = false;


  // =====================================================
  // ERROR
  // =====================================================

  errorMessage = '';

  applyError = '';


  // =====================================================
  // APPLY LEAVE MODAL
  // =====================================================

  applyModalVisible = false;


  // =====================================================
  // APPLY LEAVE FORM
  // =====================================================

  leaveForm = {

    leaveType: '',

    from: '',

    to: '',

    reason: ''

  };


  // =====================================================
  // LEAVE TYPES
  // Frontend options
  // =====================================================

  leaveTypes: string[] = [

    'CASUAL',

    'SICK',

    'ANNUAL'

  ];


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private leaveService:
      LeaveRequestsService
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.loadMyLeaves();

  }


  // =====================================================
  // GET MY LEAVES
  // =====================================================

  loadMyLeaves(): void {

    this.loading = true;

    this.errorMessage = '';


    this.leaveService
      .getMyLeaves()
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: any[]
        ) => {

          console.log(
            'MY LEAVES:',
            response
          );


          // ---------------------------------------------
          // Store only required fields
          // ---------------------------------------------

          this.leaveRequests =
            (response || []).map(
              leave => ({

                id:
                  leave.id,

                name:
                  leave.name,

                email:
                  leave.email,

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


          this.loading = false;

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'GET MY LEAVES ERROR:',
            error
          );


          this.leaveRequests = [];


          this.errorMessage =
            error?.error?.responseMessage ||

            error?.error?.message ||

            'Unable to load leave requests.';


          this.loading = false;

        }

      });

  }


  // =====================================================
  // OPEN APPLY LEAVE
  // =====================================================

  applyLeave(): void {

    this.applyError = '';


    // -----------------------------------------------
    // RESET FORM
    // -----------------------------------------------

    this.leaveForm = {

      leaveType: '',

      from: '',

      to: '',

      reason: ''

    };


    // -----------------------------------------------
    // OPEN MODAL
    // -----------------------------------------------

    this.applyModalVisible = true;

  }


  // =====================================================
  // CLOSE APPLY LEAVE MODAL
  // =====================================================

  closeApplyModal(): void {

    if (this.applyLoading) {

      return;

    }


    this.applyModalVisible = false;

    this.applyError = '';

  }


  // =====================================================
  // SUBMIT LEAVE
  // =====================================================

  submitLeave(): void {

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!this.leaveForm.leaveType) {

      this.applyError =
        'Please select leave type.';

      return;

    }


    if (!this.leaveForm.from) {

      this.applyError =
        'Please select from date.';

      return;

    }


    if (!this.leaveForm.to) {

      this.applyError =
        'Please select to date.';

      return;

    }


    if (!this.leaveForm.reason.trim()) {

      this.applyError =
        'Please enter reason.';

      return;

    }


    // ===================================================
    // DATE VALIDATION
    // ===================================================

    if (
      this.leaveForm.from >
      this.leaveForm.to
    ) {

      this.applyError =
        'To date cannot be before from date.';

      return;

    }


    // ===================================================
    // START LOADING
    // ===================================================

    this.applyLoading = true;

    this.applyError = '';


    // ===================================================
    // POST PAYLOAD
    // ===================================================

    const payload = {

      leaveType:
        this.leaveForm.leaveType,

      from:
        this.leaveForm.from,

      to:
        this.leaveForm.to,

      reason:
        this.leaveForm.reason.trim()

    };


    console.log(
      'CREATE LEAVE PAYLOAD:',
      payload
    );


    // ===================================================
    // POST API
    // ===================================================

    this.leaveService
      .createLeave(payload)
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: any
        ) => {

          console.log(
            'LEAVE CREATED:',
            response
          );


          this.applyLoading = false;


          this.applyModalVisible =
            false;


          // ---------------------------------------------
          // Reload latest leaves
          // ---------------------------------------------

          this.loadMyLeaves();

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'CREATE LEAVE ERROR:',
            error
          );


          this.applyError =
            error?.error?.responseMessage ||

            error?.error?.message ||

            'Unable to apply leave.';


          this.applyLoading = false;

        }

      });

  }

}