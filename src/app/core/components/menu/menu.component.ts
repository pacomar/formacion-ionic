import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link.model';
import { AppURl } from 'src/app/config/app-urls.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  links: Link[] = [];

  constructor() {}

  ngOnInit() {
    this.links.push(new Link('Home', AppURl.AppHome));
    this.links.push(
      new Link(
        'Superheroes',
        AppURl.AppSuperHero + '/' + AppURl.AppSuperHeroList
      )
    );
    this.links.push(
      new Link('Contacto', AppURl.AppInfo + '/' + AppURl.AppContact)
    );
    this.links.push(new Link('About', AppURl.AppInfo + '/' + AppURl.AppAbout));
  }
}
