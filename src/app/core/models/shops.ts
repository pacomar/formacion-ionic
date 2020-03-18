export class Shops {
    closeHour : string;
    latitude: number;
    longitude: number;
    name: string;
    openHour: string; 

    constructor(closeHour: string, latitude: number, longitude: number, name: string, openHour: string) {
        this.closeHour = closeHour;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.openHour = openHour;
    }
}
