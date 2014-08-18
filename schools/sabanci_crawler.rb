require 'nokogiri'
require 'json'
require 'time'
require 'net/http'
require 'uri'

doc = Nokogiri(File.open('bannerweb.html'))

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

items.css('tr').each_cons(2) do |row_pair|
	lecture = Hash.new
	isEmpty = row_pair[0].css('th.ddlabel').text == ""
	
	if !isEmpty
		splitted = row_pair[0].css('th.ddlabel').text.split(' - ')
		if splitted.count == 4
			lecture['title'] = splitted[0]
			lecture['type'] = ""
			lecture['id'] = splitted[1]
			lecture['name'] = splitted[2]
			lecture['section'] = splitted[3]
		else 
			lecture['title'] = splitted[0]
			lecture['type'] = splitted[1]
			lecture['id'] = splitted[2]
			lecture['name'] = splitted[3]
			lecture['section'] = splitted[4]
		end
		p lecture['name']
		lecture['catalog'] = "http://suis.sabanciuniv.edu#{row_pair[1].css('td.dddefault a')[0]['href']}"
		begin 
			lectureDetail = Nokogiri(Net::HTTP.get(URI.parse(lecture['catalog'])))
			lecture['summary'] = lectureDetail.css('td.ntdefault').to_s.split('<br>')[0].split('</i>')[1].gsub("\n", " ").strip!
			lecture['levels'] = lectureDetail.css('td.ntdefault').to_s.split("</span>")[1].split('<br>')[0].strip!
		rescue Exception => e
			p lecture['title']
			p lecture["id"]
			p lecture['catalog']
			p lectureDetail.css('td.ntdefault').to_s
			p e.message
		end	
	end

	informationList = Array.new
	
	if row_pair[1] != nil
		row_pair[1].css('td.dddefault table.datadisplaytable tr').each do |second|
			tds = second.css('td')
			if tds.count > 0
				tds.each_slice(tds.count) do |item|
					information = Hash.new
					dayCount = item[2].text[0,1]
					information['location'] = item[3].text.gsub("Fac.of Arts and Social Sci.", "FASS").gsub("School of Management", "FMAN").gsub("Fac. of Engin. and Nat. Sci.", "FENS").gsub("School of Languages Building", "SL")
					information['teacher'] = item[6].text.gsub(" (P)", "")

					if (item[1].text != "TBA" && item[3].text != "TBA")
						whichDays = Array.new
						if dayCount.length == 1
							whichDays.push(getIndexWeek(dayCount))
						else
							dayCount.length.times do |item|
								whichDays.push(getIndexWeek(dayCount[item]))
							end
						end
						
						startsMorning = item[1].text.split(' - ')[0].split(' ')[1] == "am"
						startTimePair = item[1].text.split(' - ')[0].split(' ')[0].split(':')
						startTimeHour = startTimePair[0].to_i
						if !startsMorning && startTimeHour != 12
							startTimeHour += 12
						end
						startTimeMinute = startTimePair[1].to_i
						
						endsMorning = item[1].text.split(' - ')[1].split(' ')[1]  == "am"
						endTimePair = item[1].text.split(' - ')[1].split(' ')[0].split(':')
						endTimeHour = endTimePair[0].to_i
						if !endsMorning && endTimeHour != 12
							endTimeHour += 12
						end
						endTimeMinute = endTimePair[1].to_i

						whichDays.each do |item|
							information['startDate'] = Time.local(2014,"jan",item+13,startTimeHour,startTimeMinute,0).to_i * 1000
							information['endDate'] = Time.local(2014,"jan",item+13,endTimeHour,endTimeMinute,0).to_i * 1000
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