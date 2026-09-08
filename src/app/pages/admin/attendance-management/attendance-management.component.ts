import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  AttendanceManagementService
} from '../../../services/attendance-management.service';


// =====================================================
// ATTENDANCE INTERFACE
// =====================================================

interface Attendance {

  email: string;

  checkIn: string;

  checkOut: string | null;

  status: string;

  workingMinutes: number | null;

}


// =====================================================
// DATE OPTION INTERFACE
// =====================================================

interface DateOption {

  value: string;

  label: string;

}


// =====================================================
// COMPONENT
// =====================================================

@Component({
  selector: 'app-attendance-management',

  templateUrl:
    './attendance-management.component.html',

  styleUrls: [
    './attendance-management.component.css'
  ]
})
export class AttendanceManagementComponent
  implements OnInit {


  // =====================================================
  // SELECTED DATE
  // =====================================================

  selectedDate = '';


  // =====================================================
  // DATE OPTIONS
  // =====================================================

  dateOptions: DateOption[] = [];


  // =====================================================
  // ALL RECORDS
  // =====================================================

  allRecords: Attendance[] = [];


  // =====================================================
  // FILTERED RECORDS
  // =====================================================

  records: Attendance[] = [];


  // =====================================================
  // SUMMARY
  // =====================================================

  summary = {

    present: 0,

    absent: 0

  };


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  errorMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private attendanceService:
      AttendanceManagementService
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.loadAttendance();

  }


  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  loadAttendance(): void {

    this.loading = true;

    this.errorMessage = '';


    this.attendanceService
      .getAllAttendance()
      .subscribe({

        next: (
          response: any[]
        ) => {


          console.log(
            'ATTENDANCE RESPONSE:',
            response
          );


          this.allRecords =
            (response || []).map(
              record => ({

                email:
                  record.email,

                checkIn:
                  record.checkIn,

                checkOut:
                  record.checkOut,

                status:
                  record.status,

                workingMinutes:
                  record.workingMinutes

              })
            );


          this.createDateOptions(
            response || []
          );


          if (
            !this.selectedDate &&
            this.dateOptions.length > 0
          ) {

            this.selectedDate =
              this.dateOptions[0].value;

          }


          this.filterRecords();

          this.loading = false;

        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'ATTENDANCE API ERROR:',
            error
          );


          this.errorMessage =

            error?.error?.responseMessage ||

            error?.error?.message ||

            'Unable to load attendance data.';


          this.records = [];

          this.allRecords = [];

          this.dateOptions = [];

          this.loading = false;

        }

      });

  }


  // =====================================================
  // CREATE DATE OPTIONS
  // =====================================================

  private createDateOptions(
    response: any[]
  ): void {


    const uniqueDates: string[] =
      [
        ...new Set(
          response
            .map(
              record =>
                record.attendanceDate
            )
            .filter(
              (
                date: string
              ) =>
                !!date
            )
        )
      ];


    uniqueDates.sort(
      (
        first,
        second
      ) =>

        new Date(
          second
        ).getTime()

        -

        new Date(
          first
        ).getTime()

    );


    this.dateOptions =
      uniqueDates.map(
        (
          date: string
        ) => ({

          value:
            date,

          label:
            this.formatDate(
              date
            )

        })
      );

  }


  // =====================================================
  // DATE CHANGE
  // =====================================================

  onDateChange(): void {

    this.filterRecords();

  }


  // =====================================================
  // FILTER RECORDS
  // =====================================================

  private filterRecords(): void {


    this.records =
      this.allRecords.filter(
        record =>
          record.checkIn &&
          record.checkIn.startsWith(
            this.selectedDate
          )
      );


    this.updateSummary();

  }


  // =====================================================
  // UPDATE SUMMARY
  // =====================================================

  private updateSummary(): void {


    this.summary.present =
      this.records.length;


    this.summary.absent =
      0;

  }


  // =====================================================
  // FORMAT WORKING TIME
  // =====================================================

  formatWorkingTime(
    minutes: number | null
  ): string {


    if (
      minutes === null ||
      minutes === undefined
    ) {

      return '--';

    }


    const hours =
      Math.floor(
        minutes / 60
      );


    const remainingMinutes =
      minutes % 60;


    const formattedHours =
      hours
        .toString()
        .padStart(
          2,
          '0'
        );


    const formattedMinutes =
      remainingMinutes
        .toString()
        .padStart(
          2,
          '0'
        );


    return `${formattedHours}:${formattedMinutes}`;

  }


  // =====================================================
  // FORMAT DATE
  // =====================================================

  private formatDate(
    date: string
  ): string {


    return new Date(
      date + 'T00:00:00'
    ).toLocaleDateString(
      'en-GB',
      {

        day:
          '2-digit',

        month:
          'short',

        year:
          'numeric'

      }
    );

  }

}