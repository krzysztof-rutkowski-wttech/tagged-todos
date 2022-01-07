import { Tag, TagType,TagNode } from '@/store/store.types'

const { TOP, NORMAL } = TagType

export const tags: Tag[] = [
    { id: 'top-shopping', name: 'Shopping', type: TOP, description: '' },
    { id: 'top-tasks', name: 'Tasks to do', type: TOP, description: '' },

    { id: 'top-tools', name: 'Tools', type: TOP, description: '' },
    { id: 'top-grocery', name: 'Grocery', type: TOP, description: '' },
    { id: 'top-gardening', name: 'Gardening', type: NORMAL, description: '' },

    { id: 'biedronka', name: 'Biedronka', type: TOP, description: 'grocery shop' },
    { id: 'lidl', name: 'Lidl', type: TOP, description: 'grocery shop' },
    { id: 'spar', name: 'Spar', type: TOP, description: 'grocery shop' },
    { id: 'castorama', name: 'Castorama', type: TOP, description: '' },
    { id: 'leroy-merlin', name: 'Leroy Merlin', type: TOP, description: '' },
]

export const tagTree: TagNode[] = [
    { 
        tagId: 'root',
        tags: [
            {
                tagId: 'top-shopping', 
                tags: [
                    {
                        tagId: 'top-tools',
                        tags: [ { tagId: 'castorama' }, { tagId: 'leroy merlin' } ],
                    },
                    {
                        tagId: 'top-grocery',
                        tags: [ { tagId: 'biedronka' }, { tagId: 'lidl' }, { tagId: 'spar' } ],
                    },
                ],
            },
            {
                tagId: 'top-tasks',
            },
            {
                tagId: 'top-gardening',
                tags:[ { tagId: 'castorama' } ],
            }
        ],
    },
]