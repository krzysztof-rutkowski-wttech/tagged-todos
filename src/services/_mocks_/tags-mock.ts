import { Tag, TagType,TagNode } from '@/store/store.types'

const { FIXED, NORMAL } = TagType

export const tags: Tag[] = [
    { id: 'fixed-shopping', name: 'Shopping', type: FIXED, description: '' },
    { id: 'fixed-tasks', name: 'Tasks to do', type: FIXED, description: '' },

    { id: 'fixed-tools', name: 'Tools', type: FIXED, description: '' },
    { id: 'fixed-grocery', name: 'Grocery', type: FIXED, description: '' },
    { id: 'fixed-gardening', name: 'Gardening', type: FIXED, description: '' },

    { id: 'biedronka', name: 'Biedronka', type: FIXED, description: 'grocery shop' },
    { id: 'lidl', name: 'Lidl', type: FIXED, description: 'grocery shop' },
    { id: 'spar', name: 'Spar', type: FIXED, description: 'grocery shop' },
    { id: 'castorama', name: 'Castorama', type: FIXED, description: '' },
    { id: 'leroy-merlin', name: 'Leroy Merlin', type: FIXED, description: '' },
]

export const tagTree: TagNode[] = [
    { 
        tagId: 'root',
        tags: [
            {
                tagId: 'fixed-shopping', 
                tags: [
                    {
                        tagId: 'fixed-tools',
                        tags: [ { tagId: 'castorama' }, { tagId: 'leroy merlin' } ],
                    },
                    {
                        tagId: 'fixed-grocery',
                        tags: [ { tagId: 'biedronka' }, { tagId: 'lidl' }, { tagId: 'spar' } ],
                    },
                ],
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-gardening',
                tags:[ { tagId: 'castorama' } ],
            },

            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
            {
                tagId: 'fixed-tasks',
            },
        ],
    },
]