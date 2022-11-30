enum SortDirection {
    ASC = "ASC",
    DESC = "DESC",
}

export const toggleDirection = (value: SortDirection) => {
    return value === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
}
export default SortDirection;
