require 'nokogiri'
require 'json'
require 'time'

doc=Nokogiri(File.open('bannerweb.html'))

def getIndexWeek(dayCount)
	if dayCount == "M"
		return 0
	elsif dayCount == "T"
		return 1
	elsif dayCount == "W"
		return 2
	elsif dayCount == "R"
		return 3
	elsif dayCount == "F"
		return 4
	elsif dayCount == "S"
		return 5
	end
end
items = doc.css('table')

courses = Array.new

items.css('tr').each_slice(2) do |row_pair|
	lecture = Hash.new
	isEmpty = false
	if row_pair[0].css('th.ddlabel').text != ""
		splitted = row_pair[0].css('th.ddlabel').text.split(' - ')
		lecture['title'] = splitted[0]
		lecture['courseID'] = splitted[1]
		lecture['name'] = splitted[2]
		lecture['section'] = splitted[3]
	else 
		isEmpty = true
	end
	
	informationList = Array.new
	if row_pair[1] != nil
		row_pair[1].css('td.dddefault table.datadisplaytable tr').each do |second|
			
			tds = second.css('td')
			if tds.count > 0
				
				tds.each_slice(tds.count) do |item|
					information = Hash.new
					dayCount = item[2].text
					information['location'] = item[3].text
					information['teacher'] = item[6].text

					if (item[1].text != "TBA" && item[3].text != "TBA")
						whichDays = Array.new
						if dayCount.length == 1
							whichDays.push(getIndexWeek(dayCount))
						else
							p lecture['courseID']
							p information['location']
							p information['teacher']
							dayCount.length.times do |item|
								whichDays.push(getIndexWeek(dayCount[item]))
							end
						end
						
						isAmStart = item[1].text.split(' - ')[0].split(' ')[1]
						startTimePair = item[1].text.split(' - ')[0].split(' ')[0].split(':')
						startTimeHour = startTimePair[0].to_i
						if isAmStart == "pm" && startTimeHour != 12
							startTimeHour += 12
						end
						startTimeMinute = startTimePair[1].to_i
						
						isAmEnd = item[1].text.split(' - ')[1].split(' ')[1]
						endTimePair = item[1].text.split(' - ')[1].split(' ')[0].split(':')
						endTimeHour = endTimePair[0].to_i
						if isAmEnd == "pm" && endTimeHour != 12
							endTimeHour += 12
						end
						endTimeMinute = endTimePair[1].to_i

						whichDays.each do |item|
							information['startDate'] = Time.local(2014,"jan",item+13,startTimeHour,startTimeMinute,0).to_s
							information['endDate'] = Time.local(2014,"jan",item+13,endTimeHour,endTimeMinute,0).to_s
							informationList.push(information)
						end
					else
						information['startDate'] = "TBA"
						information['endDate'] = "TBA"
						informationList.push(information)
					end
					
				end
				
			end
		end
		if !isEmpty
			lecture['informationList'] = informationList
		end
	end
	if lecture.count > 0
		courses.push(lecture)
	end
end

f = File.open("output.json", "w")
f.write(JSON.pretty_generate(courses))
f.close