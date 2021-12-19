export const checkScopes = (requiredScopes: string[][], roleScopes: any[]) => {
    if (!requiredScopes || !requiredScopes.length) {
        return roleScopes
    }

    const validScopes = []

    roleScopes.forEach(each => {
        const isValidScope = requiredScopes.every(requiredScope => {
            return each.scopes.some(scope => {
                return requiredScope.includes(scope)
            })
        })

        if (isValidScope) {
            validScopes.push(each)
        }
    })

    return validScopes
}