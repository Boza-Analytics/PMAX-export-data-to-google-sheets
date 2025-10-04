function main() {
  let ss = ''
  // Define common query elements
  let metrics = ['metrics.clicks', 'metrics.impressions', 'metrics.conversions', 'metrics.conversions_value', 'metrics.cost_micros'];
  let dateSeg = 'segments.date';
  let campName = 'campaign.name';

  // Calculate date range for the last 365 days
  let endDate = new Date();
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - 365);

  // Build the query for the "Campaign" sheet for the last 30 days
  let queryCampaign = buildQuery(campName, metrics, startDate, endDate, 'LAST_30_DAYS');
  let sheetCampaign = ss.getSheetByName('Campaign'); // Assuming the sheet name is "Campaign"
  runReport(queryCampaign, sheetCampaign);

  // Build the query for the "By Day" sheet for the last 365 days
  let queryByDay = buildQuery(dateSeg, metrics, startDate, endDate);
  let sheetByDay = ss.getSheetByName('ByDay'); // Assuming the sheet name is "ByDay"
  runReport(queryByDay, sheetByDay);
}

function buildQuery(dimension, metrics, startDate, endDate, dateRange = null) {
  let startDateFormatted = formatDate(startDate);
  let endDateFormatted = formatDate(endDate);

  let query = (
    'SELECT ' +
    dimension +
    ', ' +
    metrics.join(', ') +
    ' FROM campaign ' +
    'WHERE ' +
    (dateRange ? `segments.date DURING ${dateRange} ` : `segments.date BETWEEN "${startDateFormatted}" AND "${endDateFormatted}" `) +
    'AND campaign.advertising_channel_type = "PERFORMANCE_MAX" '
  );

  return query;
}

function formatDate(date) {
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

function runReport(query, sheet) {
  const report = AdsApp.report(query);
  report.exportToSheet(sheet);
}
