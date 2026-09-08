import {
  Component,
  OnInit
} from '@angular/core';


interface LeaveRequest {

  leaveType: string;

  from: string;

  to: string;

  status: string;

}


@Component({

  selector:
    'app-dashboard',

  templateUrl:
    './dashboard.component.html',

  styleUrls: [
    './dashboard.component.css'
  ]

})
export class DashboardComponent
  implements OnInit {


  // =====================================================
  // LOGGED IN EMPLOYEE NAME
  // =====================================================

  employeeName = '';


  // =====================================================
  // ATTENDANCE
  // =====================================================

  attendance = {

    present: 20,

    total: 22

  };


  // =====================================================
  // LEAVE BALANCE
  // =====================================================

  leaveBalance = 12;


  // =====================================================
  // PENDING LEAVES
  // =====================================================

  pendingLeaves = 1;


  // =====================================================
  // LATEST PAYSLIP
  // =====================================================

  latestPayslip = 'May 2025';


  // =====================================================
  // LEAVE REQUESTS
  // =====================================================

  leaveRequests: LeaveRequest[] = [

    {

      leaveType:
        'Casual Leave',

      from:
        '18 May 2025',

      to:
        '19 May 2025',

      status:
        'Pending'

    },

    {

      leaveType:
        'Sick Leave',

      from:
        '10 May 2025',

      to:
        '10 May 2025',

      status:
        'Approved'

    },

    {

      leaveType:
        'Annual Leave',

      from:
        '02 May 2025',

      to:
        '05 May 2025',

      status:
        'Approved'

    }

  ];


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.loadLoggedInUserName();

  }


  // =====================================================
  // LOAD CURRENT LOGGED IN USER NAME
  // =====================================================

  private loadLoggedInUserName(): void {


    // ===================================================
    // GET FIRST NAME
    // ===================================================

    const firstName =
      localStorage.getItem(
        'firstName'
      ) || '';


    // ===================================================
    // GET LAST NAME
    // ===================================================

    const lastName =
      localStorage.getItem(
        'lastName'
      ) || '';


    // ===================================================
    // SET FULL NAME
    // ===================================================

    this.employeeName =
      `${firstName} ${lastName}`.trim();


    // ===================================================
    // FALLBACK
    // ===================================================

    if (!this.employeeName) {

      this.employeeName =
        'Employee';

    }


    // ===================================================
    // CONSOLE CHECK
    // ===================================================

    console.log(
      'CURRENT LOGGED IN USER:',
      this.employeeName
    );


  }


}