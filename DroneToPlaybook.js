// Message calls are done using the row-id in the playbook client found by typing
// nasa.plan.rows.pluck('id')
// in the javascript browser console
//
// Status calls are done using the row-id and activity-id in the playbook client
// by selecting an activity and retrieving its object using 
// nasa.state.getSelection()
// the row-id is found under .row.id and the activity-id is found under .activity.id
// 
// There is currently no way to retrieve actual plan elements using the api so oh well :/

console.log("HI FAM")