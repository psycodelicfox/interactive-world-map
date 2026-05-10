import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countryinfo',
  standalone: true,
  imports: [],
  templateUrl: './countryinfo.component.html',
  styleUrl: './countryinfo.component.css'
})
export class CountryinfoComponent {
  @Input() countryName: string | null = null;
  @Input() countryCapital: string | null = null;
  @Input() countryRegion: string | null = null;
  @Input() countryIncomeLevel: string | null = null;
  @Input() countryAdditionalFactOne: string | null = null;
  @Input() countryAdditionalFactTwo: string | null = null;
  @Input() countryId: string | null = null;
}
