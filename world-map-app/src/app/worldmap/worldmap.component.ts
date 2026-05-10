import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { CountryinfoComponent } from '../countryinfo/countryinfo.component';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-worldmap',
  standalone: true,
  imports: [CommonModule, CountryinfoComponent, HttpClientModule], 
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {

  countryName: string | null = null;
  countryCapital: string | null = null;
  countryRegion: string | null = null;
  countryIncomeLevel: string | null = null;
  countryAdditionalFactOne: string | null = null;
  countryAdditionalFactTwo: string | null = null;
  countryId: string | null = null;
  countryCode: string | null = null;

  constructor(private countryService: CountryService, private http: HttpClient, private el: ElementRef) {}
  
  ngOnInit(): void {
    // Load the SVG content and inject it into the component
    this.http.get('../../assets/World-Map.svg', { responseType: 'text' }).subscribe(svgContent => {
      const container = this.el.nativeElement.querySelector('.worldmap-container');
      container.innerHTML = svgContent;
      this.addEventListeners(container);
    });
  }

  private addEventListeners(container: HTMLElement): void {
    // adding mouse click event handlers
    const paths = container.querySelectorAll('path');
    paths.forEach((path) => {
      path.addEventListener('mouseenter', (event) => this.onPathHover(event));
    });
  }

  onPathHover(event: Event): void {
    const paths = this.el.nativeElement.querySelectorAll('path');
      paths.forEach((path: any) => {
        path.style.fill = '';
    });

    // event handler itself
    const target = event.target as SVGPathElement;
    const clickedCountryId = target.getAttribute('id');

    this.countryName = target.getAttribute('name');
    this.countryId = target.getAttribute('id');
    if (this.countryId === clickedCountryId) {
      target.style.fill = '#45cf83';
    } 
    if (this.countryId) {
      this.fetchInfoAboutCountry(this.countryId)
    }
  }

  fetchInfoAboutCountry (countryCode: string): void {

    this.countryService.getCountryInfo(countryCode).subscribe({
      next: (data) => {
          const allData = data[1][0];
          this.countryCode = allData.id
          this.countryCapital = allData.capitalCity;
          this.countryRegion = allData.region.value;
          this.countryIncomeLevel = allData.incomeLevel.value;
  
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Completed.');
      }
    });
    if (this.countryId) {
          this.countryService.getAdditionalInfo(this.countryId).subscribe({
            next: (data) => {
              const allData = data[1][0];
              this.countryAdditionalFactOne = allData.countryiso3code;
              this.countryAdditionalFactTwo = allData.value.toString();
            }
          }) 
    }
  }
  
}
