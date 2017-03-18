import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Items, Item } from '../../providers/items';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: Observable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: Items) {
    this.items = this.itemService.items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  add() {
  }

  open(item: Item) {
  }

  edit(item: Item) {
  }

  remove(item: Item) {
  }

}
