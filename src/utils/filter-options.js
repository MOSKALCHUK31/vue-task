export function getStatusFilterOptions() {
    return [
        { name: 'All', value: 'all' },
        { name: 'Completed', value: 'completed' },
        { name: 'Uncompleted', value: 'uncompleted' },
        { name: 'Favorites', value: 'favorites' }
    ]
}

export function getUsersFilterOptions(currentUserId) {
    return [
        { name: 'All', value: 'all' },
        { name: `UserID: ${ currentUserId }`, value: currentUserId }
    ]
}
