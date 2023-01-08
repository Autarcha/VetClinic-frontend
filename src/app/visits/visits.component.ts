import { Component, OnInit } from '@angular/core';
import { VisitService } from '../services/visit.service';
import { Visit } from '../models/visitModel';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { VisitStatusesMapping } from '../enums/visitStatusesEnum';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css'],
})
export class VisitsComponent implements OnInit {
  selectedVisit: any = null;
  visits: Visit[] = [];
  displayModal: boolean = false;
  public visitStatusesMapping: any = VisitStatusesMapping;
  private userSubscription: Subscription | null = null;
  public userRole: number = 0;
  private userId: number = 0;

  constructor(
    private visitService: VisitService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      this.userRole = user ? user.role : 0;
      this.userId = user ? user.id : 0;
    });

    this.getVisits();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  getVisits() {
    this.visitService.getAllVisits().subscribe((response) => {
      this.visits = response;
    });
  }

  showEditModal(visit: Visit) {
    this.selectedVisit = visit;
    this.displayModal = true;
  }

  hideEditModal(isClosed: boolean) {
    this.displayModal = false;
    this.getVisits();
  }
}
