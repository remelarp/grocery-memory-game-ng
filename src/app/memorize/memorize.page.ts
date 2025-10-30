import { Component, OnInit,
         OnDestroy
       }                          from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ActivatedRoute, Router, 
         NavigationEnd }          from '@angular/router';
import { IonContent, IonHeader, 
         IonTitle, IonToolbar,
         IonThumbnail, IonText,
         IonLabel, IonItem,
         IonList, IonButtons,
         IonBackButton,
       }                          from '@ionic/angular/standalone';
import { Subscription }           from 'rxjs';
import { filter }                 from 'rxjs/operators';
import { ShoppingListService }    from '../services/shopping-list';

@Component({
    selector: 'app-memorize',
    templateUrl: './memorize.page.html',
    styleUrls: ['./memorize.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, 
              IonTitle, IonToolbar,
              IonThumbnail, IonText,
              IonItem, IonLabel,
              IonList, IonButtons,
              IonBackButton,
              CommonModule]
})
export class MemorizePage implements OnInit, OnDestroy {
    items: { id: number; name: string; image?: string }[] = [];
    showItems = true;
    COUNTDOWN = 10;
    countdown = this.COUNTDOWN;
    private interval: any;
    private routerSubscription: Subscription | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shoppingListService: ShoppingListService
    ) {}

    ngOnInit() {
        // Get the count parameter from the route
        const count = parseInt(this.route.snapshot.paramMap.get('count') || '3', 10);

        // Fetch random items based on count
        this.items = this.shoppingListService.getRandomItems(count);

        // Start a 5-second countdown, updating every second
        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                this.showItems = false;
                clearInterval(this.interval); // Stop the interval when countdown reaches 0
                this.router.navigate(['/game'], {
                    state: { memorizedItems: this.items, count }
                });
            }
        }, 1000);

        // Subscribe to router events
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if navigated to Memorize Page
        if (event.urlAfterRedirects.startsWith('/memorize')) {
          console.log('Navigated TO Memorize Page:', event.urlAfterRedirects);
          // Perform actions, e.g., reset state or log analytics
          this.resetState();
        }
        // Check if navigated away from Memorize Page
        // We can't directly detect "leaving" in the same subscription,
        // but you can infer it in other pages or use a global service
      });
    }

    private resetState() {
        this.showItems = false;
        this.countdown = this.COUNTDOWN;

        if (this.interval) {
            clearInterval(this.interval);
        }

        //const count = this.items.length;
        const count = parseInt(this.route.snapshot.paramMap.get('count') || '3', 10);
        this.items = this.shoppingListService.getRandomItems(count);
        this.showItems = true;

        this.interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                this.showItems = false;
                clearInterval(this.interval); // Stop the interval when countdown reaches 0
                this.router.navigate(['/game'], {
                    state: { memorizedItems: this.items, count }
                });
            }
        }, 1000);
    }

    ngOnDestroy() {
        // Clean up timer to prevent memory leaks
        if (this.interval) {
            clearInterval(this.interval);
        }
        // Clean up router subscription
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }
}

