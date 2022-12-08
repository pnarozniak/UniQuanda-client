import { Component, Input, OnInit } from '@angular/core';
import { IPremiumPaymentDTO } from '../../models/premium-payments.dto';

@Component({
	selector: 'app-premium-payments-list',
	templateUrl: './premium-payments-list.component.html',
	styleUrls: ['./premium-payments-list.component.scss'],
})
export class PremiumPaymentsListComponent implements OnInit {
	@Input() payments: IPremiumPaymentDTO[] | null = null;
	isMobileView: boolean = window.innerWidth <= 575;

	ngOnInit(): void {
		window.onresize = () => (this.isMobileView = window.innerWidth <= 575);
	}
}
