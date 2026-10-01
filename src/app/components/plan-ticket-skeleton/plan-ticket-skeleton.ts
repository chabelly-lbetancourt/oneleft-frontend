import { Component } from '@angular/core';
import { Skeleton } from '../skeleton/skeleton';

/** The shape of a plan of a list while the plans load (same size as the plan ticket, so nothing jumps). */
@Component({
  selector: 'app-plan-ticket-skeleton',
  imports: [Skeleton],
  templateUrl: './plan-ticket-skeleton.html',
  styleUrl: './plan-ticket-skeleton.scss',
})
export class PlanTicketSkeleton {}
