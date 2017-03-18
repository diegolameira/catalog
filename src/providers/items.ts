import { Injectable, Inject } from '@angular/core';
import { Firebase } from './firebase';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Items extends Firebase {

  api: string = '/items';
  items: Observable<Item[]>;
  ref: any;

  constructor( af: AngularFire, @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
    super(af, firebaseApp);
    const _items = this.databaseList(this.api);
    this.ref = _items.$ref.ref;
    this.items = _items.map(items => items.map(item => {
      let val = item.val();
      return new Item(item.key, val.pic, val.lat, val.lng, val.title, val.description );
    }));
  }

  add(item: Item)
  {
    this.databaseList(this.api).push(item);
  }

  update(item: Item)
  {
    // TODO: _key must change somehow
    const key = item.key;
    delete item.key;
    this.ref.child(key).update(item);
  }

  remove(item: Item)
  {
    this.ref.child(item.key).remove();
  }

}

export interface iItem {

  pic: string;
  lat: string;
  lng: string;

  title: string;
  description?: string;

}

export class Item implements iItem {

  constructor(
    public key: string,
    public pic: string,
    public lat: string,
    public lng: string,
    public title: string,
    public description?: string
  ){
  }

}
