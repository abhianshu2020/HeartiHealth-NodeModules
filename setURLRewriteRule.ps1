$name = 'Angular Routes'
$inbound = '.*'
$outbound = './index.html'
$grouping = 'MatchAll'
$site = 'IIS:\Sites\Default Web Site'
$root = 'system.webServer/rewrite/rules'
$filter = "{0}/rule[@name='{1}']" -f $root, $name

Add-WebConfigurationProperty -PSPath $site -filter $root -name '.' -value @{name=$name; patterSyntax='Regular Expressions'; stopProcessing='true'}
Set-WebConfigurationProperty -PSPath $site -filter "$filter/match" -name 'url' -value $inbound
Set-WebConfigurationProperty -PSPath $site -filter "$filter/conditions" -name 'logicalGrouping' -value $grouping 
Set-WebConfigurationProperty -PSPath $site -filter "$filter/conditions" -name '.' -value @{input='{REQUEST_FILENAME}'; matchType='IsFile'; negate='true'},@{input='{REQUEST_FILENAME}'; matchType='IsDirectory'; negate='true'}
Set-WebConfigurationProperty -PSPath $site -filter "$filter/action" -name 'type' -value 'Rewrite'
Set-WebConfigurationProperty -PSPath $site -filter "$filter/action" -name 'url' -value $outbound