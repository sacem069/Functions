# Parsons Making Center Wayfinding 

## Project Overview 

This project is a web-based tool designed to help Parsons students find the correct Making Center facility based on the tool they need, the day and the time of day. 

Currently, information about Making Center spaces is spread across multiple webpages,making it difficult for students to quickly understand where to go and when facilities are open. This project simplifies that process by transforming user input into clear, filtered results. 

User select: 
- **facility**
- **lab**
- **tool**
- **day**
- **time**

The system then filters the available Making Center data and returns matching labs that are opened during the selected time. 

--- 

## Problem 

Students often struggle to: 
- Understand which facilities exist 
- Know which tools are available in each lab 
- Determine if a lab is open at a specific time 
- Navigate multiple webpages to gather this information 

This creates confusion and leads to a lack of knowledge about the amount of spaces you can use in school. 

## Solution 

This project introduces a structures selection system that: 

1. Lets users choose a **facility**
2. Displays labs belonging to that facility 
3. Allows users to select a **tool** from that lab 
4. Lets users choose a **day** and **time**
5. Filters results dynamically based on availability 

The interface updates interactively and only enables the **Search** button once all required inputs are selected. 

## Features 

- Facility-based filtering 
- Lab selection system 
- Dinamic tool dropdown per lab 
- Time of day filtering (Morning/Afternoon/Evening)
- Weekday vs Weekend logic 
- Dynamic enabling/disabling of buttons 
- Result reset when chaning selections 
- Color-coded facilties 
- Responsive layout 

## How It Works 

### Step 1 - Facility Selection 

Users select a facility category. 
Each facility is color-coded to visually distinguis different types of spaces. 

Facilities: 
- 3D & Digital Prototyping 
- Print 
- Media 
- Wood, Metal and Ceramics 
- Sewing and Textiles 
- Open Work Spaces 

### Step 2 - Lab Selection 

AAfter selecting a facility, available labs are displayed. 

Clicking a lab: 
- Replaces the lab button with a dropdown 
- Displays available tools for that lab 
- Resets previous results 

Only one lab dropdown can be active at a time

### Step 3 - Tool Selection 

User chooses a specific tool from dropdown. 

The tool selection updates: 
- The hidden from value 
- Button activation state 
- Result availability logic 


### Step 4 - Day and Time Selection 

User selects: 

- A day (dropdown)
- A time range (Morning/ Afternoon / Evening Buttons)

These selections activate visual states and update filtering logic 


### Step 5 - Search Results 

Once all inputs are selected, the **Search** button becomes active. 

Clicking Search: 
- Filters the dataset 
- Displays matching labs 
- Scrolls results into view 

## Data Source 

The project uses a JSON dataset containing: 

- Facility name 
- Lab name 
- Available tools 
- Weekday hours 
- Weekedn hours
- Images 
- Location information 


## Author 

Maika Sacerdote
MPS Communication Design 
Parsons School of Design 
Spring 2026 