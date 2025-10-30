import { Component, OnInit }         from '@angular/core';
import { CommonModule }              from '@angular/common';
import { Router, NavigationExtras }  from '@angular/router';
import { OverlayEventDetail }        from '@ionic/core';
import { IonContent, IonHeader, 
         IonTitle, IonToolbar, 
         IonGrid, IonRow, IonCol, 
         IonImg, IonActionSheet, 
         IonButtons, IonBackButton,
         NavController
        }                            from '@ionic/angular/standalone';
import { ShoppingListService }       from '../services/shopping-list';

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, 
        IonTitle, IonToolbar, 
        IonGrid, IonRow, 
        IonCol, IonImg, 
        IonActionSheet, IonButtons, 
        IonBackButton,
        CommonModule
    ]
})
export class GamePage implements OnInit {
    memorizedItems: { id: number; name: string; image?: string }[] = [];
    gameItems: { id: number; name: string; image?: string }[] = [];
    selectedItems: number[] = [];
    actionSheetOpen = false;
    actionSheetHeader = '';
    actionSheetSubHeader = '';
    count = 3;

    isActionSheetOpen = false;
    public actionSheetButtons = [{
        text: 'Repeat',
        role: 'seleted',
        data: {
            action: 'repeat',
        },
    },
    {
        text: 'Home',
        role: 'cancel',
        data: {
            action: 'home',
        },
    }];

    constructor(
        private router: Router,
        private navController: NavController,
        private shoppingListService: ShoppingListService
    ) {
        const navState = this.router.currentNavigation()?.extras.state;
        this.memorizedItems = navState?.['memorizedItems'] || [];
        this.count = navState?.['count'] || 3;
    }

    ngOnInit() {
        this.gameItems = this.shoppingListService.getGameItems(this.memorizedItems);
    }

    toggleSelection(itemId: number) {
        if (this.selectedItems.includes(itemId)) {
            this.selectedItems = this.selectedItems.filter(id => id !== itemId);
        } else if (this.selectedItems.length < this.count) {
            this.selectedItems.push(itemId);
        }

        if (this.selectedItems.length === this.count) {
            this.checkSelections();
        }
    }

    checkSelections() {
        const memorizedIds = this.memorizedItems.map(item => item.id).sort();
        const selectedIds = [...this.selectedItems].sort();
        const isCorrect = memorizedIds.length === selectedIds.length && memorizedIds.every((id, index) => id === selectedIds[index]);

        this.actionSheetHeader = isCorrect ? 'Congratulations!' : 'Incorrect';
        this.actionSheetSubHeader = isCorrect ? `You selected the correct ${this.count} items!` : 'Try again!';
        this.actionSheetOpen = true;
        this.isActionSheetOpen = true;
    }

    handleActionSheetClick(button: { text: string }) {
        this.actionSheetOpen = false;
        this.isActionSheetOpen = false;
        if (button.text === 'Repeat') {
            /*const navigationExtras: NavigationExtras = {
                state: { count: this.count }
            };
            this.router.navigate(['/memorize', this.count], navigationExtras);*/
            this.navController.navigateBack(`/memorize/${this.count}`);
        } else if (button.text === 'Home') {
            this.router.navigate(['/grocery-list']);
            this.navController.navigateBack(`/grocery-list`);
        }
    }

    onActionSheetClick(event: CustomEvent<OverlayEventDetail>) {
        this.actionSheetOpen = false;
        this.isActionSheetOpen = false;
        if (event.detail.data?.action === 'repeat') {
            /*const navigationExtras: NavigationExtras = {
                state: { count: this.count }
            };
            this.router.navigate(['/memorize', this.count], navigationExtras);*/
            this.navController.navigateBack(`/memorize/${this.count}`);
        } else if (event.detail.data?.action === 'home') {
            //this.router.navigate(['/grocery-list']);
            this.navController.navigateBack(`/grocery-list`);
        }
    }

    setOpen(isOpen: boolean) {
        this.isActionSheetOpen = isOpen;
    }

    onBackToGameList() {
        //this.router.navigate(['/grocery-list']);
        this.navController.navigateBack(`/grocery-list`);
    }
}
