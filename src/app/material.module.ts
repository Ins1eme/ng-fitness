import { NgModule } from '@angular/core';
import { MatButtonModule, 
         MatIconModule, 
         MatInputModule, 
         MatFormFieldModule, 
         MatDatepickerModule,
         MatNativeDateModule,
         MatCheckboxModule,
         MatSidenavModule,
         MatToolbarModule,
         MatListModule,
         MatTabsModule,
         MatCardModule,
         MatSelectModule,
         MatProgressSpinnerModule,
         MatDialogModule,
         MatTableModule,
         MatSortModule,
         MatPaginatorModule,
         MatSnackBarModule
} from "@angular/material"

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule

    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule
    ]
})

export class MaterialModule {}