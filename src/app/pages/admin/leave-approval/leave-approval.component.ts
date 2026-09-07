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

  leaveRequests: LeaveApproval[] = [];


  // ===================================================
  // SEARCH
  // ===================================================

  searchText = '';


  // ===================================================
  // PAGINATION
  // ===================================================

  currentPage = 1;

  itemsPerPage = 8;


  // ===================================================
  // LOADING
  // ===================================================

  loading = false;


  // ===================================================
  // ERROR MESSAGE
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

  ngOnInit(): void {

    this.loadAllLeaves();

  }


  // ===================================================
  // GET ALL LEAVES
  // ===================================================

  loadAllLeaves(): void {

    this.loading = true;

    this.errorMessage = '';


    this.leaveService
      .getAllLeaves()
      .subscribe({

        // =============================================
        // SUCCESS
        // =============================================

        next: (
          response: any[]
        ) => {

          console.log(
            'ALL LEAVES:',
            response
          );


          // ===========================================
          // MAP API RESPONSE
          // ===========================================

          this.leaveRequests =
            (response || []).map(
              leave => ({

                id:
                  leave.id,


                employee:
                  leave.name || '',


                email:
                  leave.email || '',


                requestedTo:
                  leave.requestedTo || '',


                leaveType:
                  this.formatLeaveType(
                    leave.leaveType
                  ),


                from:
                  leave.from || '',


                to:
                  leave.to || '',


                reason:
                  leave.reason || '',


                status:
                  leave.status || ''

              })
            );


          // ===========================================
          // RESET PAGE
          // ===========================================

          this.currentPage = 1;


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

          console.error(
            'GET ALL LEAVES ERROR:',
            error
          );


          this.leaveRequests = [];


          this.loading = false;


          this.errorMessage =

            error?.error?.responseMessage ||

            error?.error?.message ||

            'Unable to load leave requests.';

        }

      });

  }


  // ===================================================
  // FILTERED LEAVES
  // ===================================================

  get filteredLeaves(): LeaveApproval[] {


    const search =

      this.searchText
        .trim()
        .toLowerCase();


    // ===============================================
    // NO SEARCH
    // ===============================================

    if (!search) {

      return this.leaveRequests;

    }


    // ===============================================
    // SEARCH
    // ===============================================

    return this.leaveRequests.filter(
      leave =>

        (leave.employee || '')
          .toLowerCase()
          .includes(search)

        ||

        (leave.email || '')
          .toLowerCase()
          .includes(search)

        ||

        (leave.requestedTo || '')
          .toLowerCase()
          .includes(search)

        ||

        (leave.leaveType || '')
          .toLowerCase()
          .includes(search)

        ||

        (leave.status || '')
          .toLowerCase()
          .includes(search)

    );

  }


  // ===================================================
  // TOTAL PAGES
  // ===================================================

  get totalPages(): number {

    return Math.max(

      1,

      Math.ceil(
        this.filteredLeaves.length /
        this.itemsPerPage
      )

    );

  }


  // ===================================================
  // PAGINATED LEAVES
  // ===================================================

  get paginatedLeaves(): LeaveApproval[] {


    const startIndex =

      (
        this.currentPage - 1
      )
      *
      this.itemsPerPage;


    const endIndex =

      startIndex +
      this.itemsPerPage;


    return this.filteredLeaves.slice(

      startIndex,

      endIndex

    );

  }


  // ===================================================
  // START ITEM
  // ===================================================

  get startItem(): number {


    if (

      this.filteredLeaves.length === 0

    ) {

      return 0;

    }


    return (

      (
        this.currentPage - 1
      )
      *
      this.itemsPerPage

    )
    +
    1;

  }


  // ===================================================
  // END ITEM
  // ===================================================

  get endItem(): number {

    return Math.min(

      this.currentPage *
      this.itemsPerPage,

      this.filteredLeaves.length

    );

  }


  // ===================================================
  // SEARCH
  // ===================================================

  onSearch(): void {

    // Search karte hi
    // first page par jaayenge

    this.currentPage = 1;

  }


  // ===================================================
  // GO TO PAGE
  // ===================================================

  goToPage(
    page: number
  ): void {


    if (

      page < 1 ||

      page > this.totalPages

    ) {

      return;

    }


    this.currentPage = page;

  }


  // ===================================================
  // NEXT PAGE
  // ===================================================

  nextPage(): void {


    if (

      this.currentPage <
      this.totalPages

    ) {

      this.currentPage++;

    }

  }


  // ===================================================
  // PREVIOUS PAGE
  // ===================================================

  previousPage(): void {


    if (

      this.currentPage > 1

    ) {

      this.currentPage--;

    }

  }


  // ===================================================
  // VISIBLE PAGES
  //
  // Example:
  //
  // Previous
  // 1 2 3 ... 10
  // Next
  //
  // ===================================================

  get visiblePages(): number[] {


    const pages: number[] = [];


    // ===============================================
    // 7 OR LESS PAGES
    // ===============================================

    if (

      this.totalPages <= 7

    ) {

      for (

        let i = 1;

        i <= this.totalPages;

        i++

      ) {

        pages.push(i);

      }


      return pages;

    }


    // ===============================================
    // FIRST PAGE
    // ===============================================

    pages.push(1);


    // ===============================================
    // CURRENT PAGE NEAR START
    // ===============================================

    if (

      this.currentPage <= 4

    ) {

      pages.push(2);

      pages.push(3);

      pages.push(4);

      pages.push(5);

      pages.push(-1);

      pages.push(
        this.totalPages
      );


      return pages;

    }


    // ===============================================
    // CURRENT PAGE NEAR END
    // ===============================================

    if (

      this.currentPage >=
      this.totalPages - 3

    ) {

      pages.push(-1);


      for (

        let i =
          this.totalPages - 4;

        i <= this.totalPages;

        i++

      ) {

        pages.push(i);

      }


      return pages;

    }


    // ===============================================
    // MIDDLE
    // ===============================================

    pages.push(-1);


    pages.push(
      this.currentPage - 1
    );


    pages.push(
      this.currentPage
    );


    pages.push(
      this.currentPage + 1
    );


    pages.push(-1);


    pages.push(
      this.totalPages
    );


    return pages;

  }


  // ===================================================
  // FORMAT LEAVE TYPE
  // ===================================================

  formatLeaveType(
    leaveType: string
  ): string {


    if (!leaveType) {

      return '';

    }


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

  get pendingCount(): number {

    return this.leaveRequests
      .filter(

        leave =>
          leave.status
            ?.toUpperCase() === 'PENDING'

      )
      .length;

  }


  // ===================================================
  // APPROVED COUNT
  // ===================================================

  get approvedCount(): number {

    return this.leaveRequests
      .filter(

        leave =>
          leave.status
            ?.toUpperCase() === 'APPROVED'

      )
      .length;

  }


  // ===================================================
  // REJECTED COUNT
  // ===================================================

  get rejectedCount(): number {

    return this.leaveRequests
      .filter(

        leave =>
          leave.status
            ?.toUpperCase() === 'REJECTED'

      )
      .length;

  }

}