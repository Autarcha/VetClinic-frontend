import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VisitDetails } from '../../models/visitDetailsModel';
import { VisitDetailsService } from '../../services/visitDetails.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css'],
})
export class VisitDetailsComponent implements OnInit {
  visitId: string | null;
  visitDetails: VisitDetails;
  private userSubscription: Subscription | null = null;
  public userRole: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private visitDetailsService: VisitDetailsService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.visitId = this.route.snapshot.paramMap.get('visitId');
    this.getVisitDetails();

    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      this.userRole = user ? user.role : 0;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  visitDetailsForm = this.formBuilder.group({
    visitPurpose: [{ value: '', disabled: false }, [Validators.required]],
    description: [{ value: '', disabled: false }, [Validators.required]],
    appliedDrugs: [{ value: '', disabled: false }, []],
    prescription: [{ value: '', disabled: false }, []],
    recommendations: [{ value: '', disabled: false }, []],
    bill: [{ value: 0, disabled: false }, [Validators.required]],
  });

  getVisitDetails() {
    this.visitDetailsService
      .getVisitDetails(Number(this.visitId))
      .subscribe((response) => {
        if (response) {
          this.visitDetails = response;
          this.visitDetailsForm.patchValue(this.visitDetails);
        }
      });
  }

  addVisitDetails() {
    console.log(this.visitDetailsForm.value);
    this.visitDetailsService
      .addVisitDetails(
        Number(this.visitId),
        this.visitDetailsForm.value as VisitDetails
      )
      .subscribe(
        (result) => {
          this.getVisitDetails();
          this.messageService.add({
            key: 'myKey2',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie dodano szczegóły wizyty',
          });
        },
        (error) => {}
      );
  }

  updateVisitDetails() {
    this.visitDetailsService
      .updateVisitDetails(
        Number(this.visitId),
        this.visitDetailsForm.value as VisitDetails
      )
      .subscribe(
        (result) => {
          this.getVisitDetails();
          this.messageService.add({
            key: 'myKey4',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie zaktualizowano szczegóły wizyty',
          });
        },
        (error) => {}
      );
  }

  onSubmitDetails() {
    if (this.visitDetails) {
      this.updateVisitDetails();
    } else {
      this.addVisitDetails();
    }
  }
}
