var fullReport = [];

function main() {

    let sheetUrl = ''
    let sheetName = 'SearchTerm'; 

    let ss = SpreadsheetApp.openByUrl(sheetUrl);

    const campaignIds = getPMaxCampaigns();
    Logger.log(campaignIds)

    for (var id of campaignIds) {
        getPMaxSearchTerms(id)
    }
    let headers = Object.keys(fullReport[0]);
    console.log(headers);

    let values = fullReport.map(x => headers.map(function(y) {
        if (x[y]) { return x[y] } else { return "" }
    }));

    values.unshift(headers);

    ss.getSheetByName(sheetName).clear().getRange(1, 1, values.length, values[0].length).setValues(values);

}

function getPMaxSearchTerms(campaignId) {

    let query = AdsApp.search(
        `SELECT 
           campaign.name,
           campaign_search_term_insight.category_label,
           campaign_search_term_insight.id,
           metrics.clicks,
           metrics.impressions, 
           metrics.conversions,
           metrics.conversions_value
          FROM campaign_search_term_insight 
          WHERE segments.date DURING LAST_30_DAYS 
           AND campaign_search_term_insight.campaign_id = '${campaignId}'`);

    Logger.log(query.totalNumEntities())
    while (query.hasNext()) {
        let r = query.next()
        let row = Object.assign(r.campaign, r.campaignSearchTermInsight, r.metrics);
        delete row.resourceName
        fullReport.push(row)
    }
}

function getPMaxCampaigns() {
    let retVal = []
    let query = `SELECT campaign.id 
               FROM campaign WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX' 
                AND campaign.serving_status = 'SERVING' 
                AND campaign.status = 'ENABLED'`

    let report = AdsApp.search(query);

    while (report.hasNext()) {

        let r = report.next()
        let id = r.campaign.id
        if (retVal.indexOf(id) == -1) {
            retVal.push(id)
        }
    }
    return retVal;
}
