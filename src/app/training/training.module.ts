import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { TrainingComponent } from "./training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTraningComponent } from "./past-traning/past-traning.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { SharedModule } from "../auth/shared/shared.module";
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingReducer } from "./training.raducer";

@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        PastTraningComponent,
        CurrentTrainingComponent,
        StopTrainingComponent

    ],
    imports: [
        TrainingRoutingModule,
        SharedModule,
        StoreModule.forFeature('training', TrainingReducer)
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
}) 

export class TrainingModule {}