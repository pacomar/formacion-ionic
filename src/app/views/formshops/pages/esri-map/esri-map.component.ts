import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types

import { SelectItem } from 'primeng/api';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Shops } from 'src/app/core/models/shops';
import { SuperheroService } from 'src/app/core/services/superhero.service';


@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit, OnDestroy {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  private _zoom = 16;
  private _center: Array<number> = [-3.67, 40.45];
  private _basemap = "gray";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _featureL: esri.FeatureLayer = null;
  private _shops: any;


  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  shops: Shops[];

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private superheroService: SuperheroService,
  ) { }


  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, FeatureLayer, Point, SimpleMarkerSymbol, Polyline, SimpleRenderer, Renderer] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Polyline",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/Renderer"

      ]);


      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);

//Conoravirus Data 

      // this.superheroService.getSuperheroAll().subscribe(data => {
      //   let confirmed = data.confirmed;
      //   let locations = confirmed.locations;
      //   let cont = 0;
      //   let dataCOD = [];
      //   for (let i = 0; i < locations.length; i++) {
      //     cont++;
      //     const element = locations[i];
      //     let nameCountry = element.country;
      //     let latestCountry = element.latest;
      //     let coordinates = element.coordinates;
      //     let lat = coordinates.lat;
      //     let long = coordinates.long;
      //     let latNumber = Number(lat);
      //     let longNumber = Number(long);

      //     let points = {
      //       geometry: new Point({
      //         x: longNumber,
      //         y: latNumber
      //       }),
      //       attributes: {
      //         ObjectID: cont,
      //         name: nameCountry,
      //         latest: latestCountry
      //       }
      //     };
      //     dataCOD.push(points);
      //   }

      //   console.log(dataCOD);

      //   this._featureL = new FeatureLayer({
      //     fields: [{
      //       name: "ObjectID",
      //       alias: "ObjectID",
      //       type: "oid"
      //     }, {
      //       name: "name",
      //       alias: "Name",
      //       type: "string"
      //     },
      //     {
      //       name: "latest",
      //       alias: "Latest",
      //       type: "double"
      //     }
      //     ],
      //     objectIdField: "ObjectID",
      //     geometryType: "point",
      //     spatialReference: { wkid: 4326 },
      //     source: dataCOD,
      //     renderer: {
      //       type: 'simple',
      //       label: "",
      //       description: "",
      //       symbol: {
      //         type: "simple-marker",
      //         style: "square",
      //         color: "blue",
      //         size: "18px",
      //         outline: {
      //           color: [255, 255, 0],
      //           width: 3
      //         }
      //       }
      //     }
      //   });
      //   map.layers.add(this._featureL);
      // }, err => {
      //   console.log('Error SupeHeroListPageComponent-getSuperheroAll: ' + err);
      // });



      this.firestore.collection('quarenteneStore').snapshotChanges().subscribe(data => {
        this._shops = data.map(elem =>
          new Shops(elem.payload.doc.data()['closeHour'], elem.payload.doc.data()['latitude'], elem.payload.doc.data()['longitude'], elem.payload.doc.data()['name'], elem.payload.doc.data()['openHour'], elem.payload.doc.id, elem.payload.doc.data()['comentarie']));
        let cont = 0;
        let dataArray = [];
        for (let i = 0; i < this._shops.length; i++) {
          cont++;
          const element = this._shops[i];
          const latitude = element.latitude;
          const longitude = element.longitude;
          const name = element.name;
          let points = {
            geometry: new Point({
              x: longitude,
              y: latitude
            }),
            attributes: {
              ObjectID: cont,
              name: name,
              latitude: latitude
            }
          };
          dataArray.push(points);
        }

        this._featureL = new FeatureLayer({
          fields: [{
            name: "ObjectID",
            alias: "ObjectID",
            type: "oid"
          }, {
            name: "name",
            alias: "Name",
            type: "string"
          },
          {
            name: "latitude",
            alias: "Latitude",
            type: "double"
          }
          ],
          objectIdField: "ObjectID",
          geometryType: "point",
          spatialReference: { wkid: 4326 },
          source: dataArray,
          renderer: {
            type: 'simple',
            label: "",
            description: "",
            symbol: {
              type: "simple-marker",
              style: "square",
              color: "blue",
              size: "18px",
              outline: {
                color: [255, 255, 0],
                width: 3
              }
            }
          }
        });

        map.layers.add(this._featureL);
      }, err => {
        console.log(err);
      });

      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };
      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      return this._view;

    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }




  ngOnInit() {
    this.initializeMap().then(mapView => {
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this._view) {
      this._view.container = null;
    }
  }
}
