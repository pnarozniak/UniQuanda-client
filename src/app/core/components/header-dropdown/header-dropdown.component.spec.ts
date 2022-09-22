import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDropdownComponent } from './header-dropdown.component';

describe('DropdownComponent', () => {
	let component: HeaderDropdownComponent;
	let fixture: ComponentFixture<HeaderDropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeaderDropdownComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderDropdownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
