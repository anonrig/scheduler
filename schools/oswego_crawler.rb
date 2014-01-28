require 'nokogiri'
require 'json'
require 'time'
require 'net/http'
require 'uri'

doc = Nokogiri(File.open('oswego8.html'))

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

items = doc.css('table.datadisplaytable')

courseList = Array.new
inCategory = false
items.css('tr').each do |item|
	lecture = Hash.new
	if item.css('td.dddefault').text != ""
		item.css('td').each_cons(18) do |row_pair|
			lecture['title'] = row_pair[7].text.strip
			lecture['id'] = row_pair[1].text.strip
			lecture['type'] = ""
			lecture['name'] = row_pair[2].text.strip + ' ' + row_pair[3].text.strip
			begin
				if row_pair[3].css('a') != nil
					if row_pair[3].css('a').first[:href].include? "('"
						lecture['catalog'] = 'http://web-banner.oswego.edu/pls/prod/' + row_pair[3].css('a').first[:href].split("('")[1].split("')")[0]
					else 
						lecture['catalog'] = row_pair[3].css('a').first[:href]
					end
					lectureDetail = Net::HTTP.get(URI.parse(lecture['catalog']))
					lecture['summary'] = lectureDetail.split('<BR>')[1].split('<br>')[0].gsub("\n", " ").strip!.force_encoding('ASCII-8BIT').force_encoding('UTF-8')
					lecture['levels'] = ""
				end
			rescue Exception => e
				p e.message
			end	
			
			dayString = row_pair[8].text.tr(' ', '')
			informationList = Array.new

			if (dayString.length > 0)
				dayString.split("").each do |eachChar|
				  	information = Hash.new
					
					dayIndex = getIndexWeek(eachChar)
				
					startsMorning = row_pair[9].text.split('-')[0].split(' ')[1] == "am"
					startTimePair = row_pair[9].text.split('-')[0].split(' ')[0].split(':')
					startTimeHour = startTimePair[0].to_i
					if !startsMorning && startTimeHour != 12
						startTimeHour += 12
					end
					startTimeMinute = startTimePair[1].to_i
									
					endsMorning = row_pair[9].text.split('-')[1].split(' ')[1]  == "am"
					endTimePair = row_pair[9].text.split('-')[1].split(' ')[0].split(':')
					endTimeHour = endTimePair[0].to_i
					
					if !endsMorning && endTimeHour != 12
						endTimeHour += 12
					end
					endTimeMinute = endTimePair[1].to_i
											
					information['startDate'] = Time.local(2014,"jan",dayIndex+13,startTimeHour,startTimeMinute,0).to_i * 1000
					information['endDate'] = Time.local(2014,"jan",dayIndex+13,startTimeHour,startTimeMinute,0).to_i * 1000
					information['instructor'] = row_pair[15].text.squeeze(' ').strip.gsub(' (P)', '')
					information['location'] = row_pair[17].text
					informationList.push(information)
				end
			else
				information = Hash.new
				information['startDate'] = 'TBA'
				information['endDate'] = 'TBA'
				information['instructor'] = row_pair[15].text.squeeze(' ').strip.gsub(' (P)', '').strip
				information['location'] = row_pair[17].text.strip
				informationList.push(information)
			end
			lecture['informationList'] = informationList
			
		end
	end
	if lecture.length > 0
		courseList.push(lecture)
	end
end

p courseList

f = File.open("oswego8.json", "w")
f.write(JSON.pretty_generate(courseList))
f.close