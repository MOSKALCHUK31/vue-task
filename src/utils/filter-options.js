export function getStatusFilterOptions() {
    return [
        { name: 'All', value: 'all' },
        { name: 'Completed', value: 'completed' },
        { name: 'Uncompleted', value: 'uncompleted' },
        { name: 'Favorites', value: 'favorites' }
    ]
}

export function getUsersFilterOptions(users) {
    return [
        { name: 'All users', value: 'all' },
        ...users.map(u => ({ name: `UserID: ${ u.id }`, value: u.id }))
    ]
}
