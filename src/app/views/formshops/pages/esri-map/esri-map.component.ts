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

interface City {
  name: string;
  code: string;
}

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit, OnDestroy {




  cities1: SelectItem[];

  cities2: City[];

  selectedCity1: City;

  selectedCity2: City;










  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
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
    private router: Router
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
      const url: string = "https://services6.arcgis.com/30currU8oaQeVHvW/arcgis/rest/services/L%C3%ADneas_de_guagua/FeatureServer/0";
      // this._featureL = new FeatureLayer(url);



      //test object





      // this._featureL = new FeatureLayer({
      //   fields: [{
      //     name: "ObjectID",
      //     alias: "ObjectID",
      //     type: "oid"
      //   }, {
      //     name: "name",
      //     alias: "Name",
      //     type: "string"
      //   },
      //   {
      //     name: "latitude",
      //     alias: "Latitude",
      //     type: "number"
      //   }
      //   ],
      //   objectIdField: "ObjectID",
      //   geometryType: "point",
      //   spatialReference: { wkid: 4326 },
      //   source: [{
      //     geometry: new Point({
      //       x: -98,
      //       y: 38
      //     }),
      //     attributes: {
      //       ObjectID: 1,
      //       name: "KATL",
      //       latitude: "UAL1"
      //     }
      //   },
      //     {
      //       geometry: new Point({
      //         x: -4,
      //         y: 40
      //       }),
      //       attributes: {
      //         ObjectID: 2,
      //         name: "KZBW",
      //         latitude: "SW999"
      //       }
      //     },
      //     {
      //       geometry: new Point({
      //         x: -16,
      //         y: 28
      //       }),
      //       attributes: {
      //         ObjectID: 3,
      //         name: "ese",
      //         latitude: "wee"
      //       }
      //     }
      //   ],
      //   renderer: {
      //     type: 'simple',
      //     label: "",
      //     description: "",
      //     symbol: {
      //       type: "simple-marker", 
      //       style: "square",
      //       color: "blue",
      //       size: "18px",  
      //       outline: {  
      //         color: [255, 255, 0],
      //         width: 3  
      //       }
      //     }
      //   }
      // });



      console.log(this._featureL);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);



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
          console.log(latitude);
       
          let test = {
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
          dataArray.push(test);
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




        console.log(dataArray);



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

  filterMap(event: any) {
    const selectedLine = event.value.id;
    console.log(selectedLine);
    this._featureL.definitionExpression = "Linea = '" + selectedLine + "'";
    // this._featureL.definitionExpression = "1=1";
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
