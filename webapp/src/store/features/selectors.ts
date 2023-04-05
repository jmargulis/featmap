import {AppState} from '..'
import {createSelector} from 'reselect'
import {IFeature} from './types';
import {Annotation2, CardStatus, Color} from '../../core/misc';

const getFeaturesState = ((state: AppState) => state.features)

export const features = createSelector([getFeaturesState], s => {
    return sortFeatures(s.items)
})

export const sortFeatures = (ff: IFeature[]): IFeature[] => {
    return ff.sort(function (a, b) {
        return a.rank === b.rank ? 0 : +(a.rank > b.rank) || -1;
    }
    )
}

export const filterFeaturesOnMilestoneAndSubWorkflow = (ff: IFeature[], milestoneId: string, subWorkflowId: string) => {
    return ff.filter(f => f.milestoneId === milestoneId).filter(x => x.subWorkflowId === subWorkflowId)
}

export const filterFeaturesOnSubWorkflow = (ff: IFeature[], subWorkflowId: string) => {
    return ff.filter(x => x.subWorkflowId === subWorkflowId)
}



export const filterFeaturesOnMilestone = (ff: IFeature[], milestoneId: string) => {
    return ff.filter(f => f.milestoneId === milestoneId)
}

export const closedFeatures = (ff: IFeature[]) => {
    return ff.filter(f => f.status === CardStatus.CLOSED)
}

export const getFeature = (ff: IFeature[], id: string) => {
    return ff.find(f => f.id === id)!
}

export const filterFeaturesByColor = (ff: IFeature[], color: Color) => {
   return ff.filter(f => color === Color.NONE || f.color === color)
}

export const filterFeaturesByAnnotation = (ff: IFeature[], annotations: Annotation2[]) => {
    return ff.filter(f => {
        if (annotations.length === 0) return true

        const cardAnnotations = f.annotations.split(',')
        let bResult = false
        for (const annotation of annotations ) {
            bResult = bResult || cardAnnotations.includes(annotation)
        }
        return bResult
    })
}