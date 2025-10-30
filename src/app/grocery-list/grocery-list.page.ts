import { Component, OnInit }    from '@angular/core';
import { CommonModule }         from '@angular/common';
import { Router }               from '@angular/router';
import { IonContent, IonHeader, 
         IonTitle, IonToolbar,
         IonGrid, IonCol,
         IonRow
       }                        from '@ionic/angular/standalone';

@Component({
    selector: 'app-grocery-list',
    templateUrl: './grocery-list.page.html',
    styleUrls: ['./grocery-list.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, 
                IonTitle, IonToolbar,
                IonGrid, IonCol, IonRow,
                CommonModule]
})
export class GroceryListPage implements OnInit {
    itemCounts: number[] = [];

    constructor(private router: Router) {}

    ngOnInit() {
        for (let i = 3; i <= 24; i++) {
            this.itemCounts.push(i);
        }
    }

    goToMemorizePage(count: number) {
        this.router.navigate(['/memorize', count]);
    }
}

