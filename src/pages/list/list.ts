import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Items, Item } from '../../providers/items';

import { AddPage } from '../add/add';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: Observable<Item[]>;

  constructor(public modalCtrl: ModalController, public itemService: Items) {
    this.items = this.itemService.items;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  add() {
    let addModal = this.modalCtrl.create(AddPage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.itemService.add(item);
      }
    })
    addModal.present();
  }

  open(item: Item) {
  }

  edit(item: Item) {
  }

  remove(item: Item) {
  }

}
