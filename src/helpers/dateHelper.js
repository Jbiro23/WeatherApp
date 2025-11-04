export function getDateInFuture(days) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    return futureDate.toISOString().split('T')[0];
}