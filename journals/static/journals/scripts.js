      //this is backend js script for the journal entries app

      //sidebar script toggle functions
      const sidebar = document.querySelector('.sidebar');
      const toggleBtn = document.querySelector('.toggle-btn');


      toggleBtn.addEventListener('click', () => {
          sidebar.classList.toggle('active');
      });

      //---------------------------------------------------------------------------------------------------------

      //word count functions
      document.addEventListener('DOMContentLoaded', function () {
          // Select the textarea and the word count display
          const entryField = document.getElementById('entry');
          const wordCountDisplay = document.getElementById('word-count');


          // Function to update the word count
          function updateWordCount() {
              // Split the entry on spaces and filter out empty words to get an accurate word count
              const words = entryField.value.match(/\b[-?(\w+)?]+\b/gi);
              const wordCount = words ? words.length : 0;
              wordCountDisplay.textContent = `Word count: ${wordCount}`;
          }


          // Event listener for when the user types in the textarea
          entryField.addEventListener('input', updateWordCount);


          // Initialize the word count when the page loads
          updateWord
      });

      //---------------------------------------------------------------------------------------------------------


      //time bar top right functions
      document.addEventListener('DOMContentLoaded', function () {
          // Function to format the day of the week
          function getDayOfWeek(date) {
              const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              return daysOfWeek[date.getDay()];
          }


          // Function to format the time as AM/PM
          function formatAMPM(date) {
              let hours = date.getHours();
              let minutes = date.getMinutes();
              const ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0' + minutes : minutes;
              const strTime = hours + ':' + minutes + ' ' + ampm;
              return strTime;
          }


          // Update the time-bar every second
          setInterval(() => {
              const now = new Date();
              const dayOfWeek = getDayOfWeek(now);
              const time = formatAMPM(now);
              document.getElementById('time-bar').textContent = `${dayOfWeek}, ${time}`;
          }, 1000);
      });

      //---------------------------------------------------------------------------------------------------------
      //Journal Entry functions


      // Get the file button and file input
      const fileButton = document.querySelector('.file-button');
      const fileInput = document.getElementById('upload-image');


      // Add event listener to file button
      fileButton.addEventListener('click', function () {
          fileInput.click(); // Trigger the file input click event
      });


      // Add event listener to file input change event
      fileInput.addEventListener('change', function () {
          const file = this.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                  const imageUrl = e.target.result;
                  const entryContent = document.querySelector('.entry-content');
                  const imagePreview = entryContent.querySelector('.image-preview');
                  imagePreview.style.backgroundImage = `url('${imageUrl}')`;
                  imagePreview.style.display = 'block'; // Make the image preview visible
              };
              reader.readAsDataURL(file);
          }
      });


      // Clear button function
      document.addEventListener('DOMContentLoaded', function () {
          const clearButton = document.getElementById('clear-button');


          clearButton.addEventListener('click', function () {
              // Reset text fields
              document.getElementById('date').value = '';
              document.getElementById('title').value = '';
              document.getElementById('entry').value = '';


              // Clear image preview, if you have an element for that
              const imagePreview = document.querySelector('.image-preview');
              if (imagePreview) {
                  imagePreview.style.backgroundImage = '';
                  imagePreview.style.display = 'none';
              }


              // If you're using an <input type="file"> to upload images,
              // you may need to reset this as well
              const fileInput = document.getElementById('upload-image');
              if (fileInput) {
                  fileInput.value = ''; // This will clear the file input
              }
          });
      });




      // Entry script functions
      const entryForm = document.querySelector('.entry-form');
      const entryContainer = document.querySelector('#entries-container');
      const submitButton = document.querySelector('#submit-button');




      // Function to create the delete button
      function createDeleteButton() {
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-btn');
          deleteButton.innerHTML = "<i class='bx bxs-trash' title='Delete'></i>";


          // Add event listener to handle click event on delete button
          deleteButton.addEventListener('click', function (event) {
              handleDeleteButtonClick(event);
          });
          return deleteButton;
      }


      // Function to handle delete button click
      function handleDeleteButtonClick(event) {
          const entry = event.target.closest('.entry');
          // Ask for confirmation
          const confirmDelete = confirm("Are you sure you want to delete this entry?");


          // If confirmed, delete the entry
          if (confirmDelete) {
              entry.remove();
          }
      }




      // Event delegation for delete button
      entryContainer.addEventListener('click', function (event) {
          if (event.target.classList.contains('delete-btn')) {
              handleDeleteButtonClick(event);
          }
      });




      // Function to create the edit button
      function createEditButton() {
          const editButton = document.createElement('button');
          editButton.classList.add('edit-btn');
          editButton.innerHTML = "<i class='bx bxs-edit' title='Edit'></i>"; // Use the appropriate icon class for edit

          // Add event listener to handle click event on edit button
          editButton.addEventListener('click', handleEditButtonClick);
          return editButton;
      }

      // Function to handle edit button click
      function handleEditButtonClick(event) {
          const entry = event.target.closest('.entry');
          const entryId = entry.dataset.entryId;

          // Find the entry's current data
          const entryDate = entry.querySelector('h2').textContent;
          const entryTitle = entry.querySelector('h3').textContent;
          const entryText = entry.querySelector('p').textContent;
          const entryImage = entry.querySelector('.image-preview') ?
              entry.querySelector('.image-preview').style.backgroundImage.slice(5, -2) : ''; // Remove url("")

          // Populate the form fields with this data
          document.querySelector('#date').value = entryDate;
          document.querySelector('#title').value = entryTitle;
          document.querySelector('#entry').value = entryText;

          // If there's an image, display it in the form's image preview
          const formImagePreview = document.querySelector('.entry-form .image-preview');
          if (formImagePreview && entryImage) {
              formImagePreview.style.backgroundImage = `url('${entryImage}')`;
              formImagePreview.style.display = 'block';
          }

          // Store the entryId in the form so we know we're editing
          const form = document.querySelector('.entry-form');
          form.dataset.editingEntryId = entryId;

          // After populating the form, set the focus to the entry text area
          const entryTextArea = document.querySelector('#entry');
          entryTextArea.focus();

          // Optional: if we want to move the cursor to the end of the text
          const textLength = entryTextArea.value.length;
          entryTextArea.setSelectionRange(textLength, textLength);


      }




      // Function to create and append new entry
      function appendNewEntry(date, title, text, imageUrl) {
          // Create a new entry element
          const newEntry = document.createElement('div');
          newEntry.classList.add('entry');

          // Unique ID for the entry, could be a timestamp or a unique number from a counter
          newEntry.dataset.entryId = Date.now().toString();

          // Create and append edit button to the new entry
          const editButton = createEditButton();
          newEntry.appendChild(editButton);


          // Create entry content container
          const entryContent = document.createElement('div');
          entryContent.classList.add('entry-content');


          // Create date element
          const entryDate = document.createElement('h2');
          entryDate.textContent = date;
          entryContent.appendChild(entryDate); // Append date to entry content container


          // Create title element
          const entryTitle = document.createElement('h3');
          entryTitle.textContent = title;
          entryContent.appendChild(entryTitle); // Append title to entry content container


          // Create text content element
          const entryText = document.createElement('p');
          entryText.textContent = text;
          entryContent.appendChild(entryText); // Append text to entry content container


          // Append entry content container to the new entry
          newEntry.appendChild(entryContent);


          // Create and append delete button to the new entry
          const deleteButton = createDeleteButton();
          newEntry.appendChild(deleteButton);


          // Check if there's an image and create an image preview
          if (imageUrl) {
              const imagePreview = document.createElement('div');
              imagePreview.classList.add('image-preview');
              imagePreview.style.backgroundImage = `url('${imageUrl}')`;
              imagePreview.style.display = 'block'; // Make sure to set this to block
              newEntry.appendChild(imagePreview); // Append image preview to new entry
          }

          // Add the new entry to the entries container
          entryContainer.appendChild(newEntry);
      }



      submitButton.addEventListener('click', function () {
          const form = document.querySelector('.entry-form');
          const isEditing = form.dataset.editingEntryId; // Check if we're editing an entry
          const dateValue = document.querySelector('#date').value;
          const titleValue = document.querySelector('#title').value;
          const textValue = document.querySelector('#entry').value;
          const fileInputValue = fileInput.files.length;

          // Check if all fields are empty
          if (!dateValue && !titleValue && !textValue && !fileInputValue) {
            alert("Please fill in at least one field before saving the entry.");
            return; // Stop the function from proceeding
        }



          // Handle image preview update
          let imageUrl = null;
          const existingImagePreview = document.querySelector('.entry-form .image-preview');
          if (fileInput.files.length > 0) {
              const file = fileInput.files[0];
              imageUrl = URL.createObjectURL(file); // This creates a URL for the selected file
          } else if (existingImagePreview && existingImagePreview.style.backgroundImage) {
              imageUrl = existingImagePreview.style.backgroundImage.slice(5, -2); // Get the existing image URL if it's there
          }

          if (isEditing) {
              // Existing entry update logic
              const entryToUpdate = document.querySelector(`[data-entry-id="${isEditing}"]`);
              if (entryToUpdate) {
                  entryToUpdate.querySelector('h2').textContent = dateValue;
                  entryToUpdate.querySelector('h3').textContent = titleValue;
                  entryToUpdate.querySelector('p').textContent = textValue;

                  const imagePreview = entryToUpdate.querySelector('.image-preview');
                  if (imageUrl) {
                      if (imagePreview) {
                          imagePreview.style.backgroundImage = `url('${imageUrl}')`;
                      } else {
                          // Create and append a new image preview
                          const newImagePreview = document.createElement('div');
                          newImagePreview.classList.add('image-preview');
                          newImagePreview.style.backgroundImage = `url('${imageUrl}')`;
                          newImagePreview.style.display = 'block';
                          entryToUpdate.appendChild(newImagePreview);
                      }
                  } else if (imagePreview) {
                      imagePreview.style.display = 'none'; // Hide if no image
                  }
              }
              // Clear the editing mode
              delete form.dataset.editingEntryId;
          } else {
              // New entry append logic
              appendNewEntry(dateValue, titleValue, textValue, imageUrl);
          }

          // Form reset logic
          entryForm.reset();
          if (existingImagePreview) {
              existingImagePreview.style.backgroundImage = '';
              existingImagePreview.style.display = 'none';
          }
          fileInput.value = '';
      });

      

      //---------------------------------------------------------------------------------------------------------

      // Corrected Get the Calendar button and the Calendar container
      const calendarBtn = document.getElementById("calendar-btn"); // Ensure this ID is unique
      const calendarContainer = document.getElementById("calendar-container");


      // Add event listener to the Calendar button
      calendarBtn.addEventListener("click", (event) => {
          event.stopPropagation(); // Stop the event from bubbling up
          // Toggle the display of the Calendar container
          calendarContainer.style.display = calendarContainer.style.display === "none" ? "block" : "none";
      });


      // Calendar functions
      const monthYearElement = document.getElementById("monthYear");
      const datesElement = document.getElementById("dates");
      const prevMonthButton = document.getElementById("prevMonth");
      const nextMonthButton = document.getElementById("nextMonth");


      let currentDate = new Date();


      prevMonthButton.addEventListener("click", () => {
          currentDate.setMonth(currentDate.getMonth() - 1);
          renderCalendar();
      });


      nextMonthButton.addEventListener("click", () => {
          currentDate.setMonth(currentDate.getMonth() + 1);
          renderCalendar();
      });


      function renderCalendar() {
          const month = currentDate.getMonth();
          const year = currentDate.getFullYear();
          const today = new Date(); // Get today's date


          monthYearElement.textContent = `${getMonthName(month)} ${year}`;


          datesElement.innerHTML = "";


          const firstDayOfMonth = new Date(year, month, 1);
          const lastDayOfMonth = new Date(year, month + 1, 0);
          const daysInMonth = lastDayOfMonth.getDate();


          const startingDay = firstDayOfMonth.getDay();


          for (let i = 0; i < startingDay; i++) {
              const dateElement = document.createElement("div");
              dateElement.classList.add("date");
              datesElement.appendChild(dateElement);
          }


          for (let i = 1; i <= daysInMonth; i++) {
              const dateElement = document.createElement("div");
              dateElement.classList.add("date");
              dateElement.textContent = i;


              // Check if the current date is today
              if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                  dateElement.classList.add("today");
              }


              dateElement.addEventListener("click", () => {
                  alert(`Clicked on ${getMonthName(month)} ${i}, ${year}`);
              });
              datesElement.appendChild(dateElement);
          }
      }


      function getMonthName(month) {
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
              "October", "November", "December"
          ];
          return monthNames[month];
      }


      // Drag and drop functionality
      const calendar = document.querySelector(".calendar");
      const header = document.querySelector(".header"); // Select the header element


      function onDrag({
          movementX,
          movementY
      }) {
          let left = parseInt(window.getComputedStyle(calendar).left);
          let top = parseInt(window.getComputedStyle(calendar).top);
          calendar.style.left = `${left + movementX}px`;
          calendar.style.top = `${top + movementY}px`;
      }


      header.addEventListener("mousedown", () => {
          header.classList.add("active");
          header.addEventListener("mousemove", onDrag);
      });


      document.addEventListener("mouseup", () => {
          header.removeEventListener("mousemove", onDrag);
      });


      // Initial rendering of the calendar
      renderCalendar();

      //---------------------------------------------------------------------------------

      //what the daily code functions do right now
      //It shows a daily prompt, randomly selected from an array of prompts.
      //It saves the user's response in local storage with a key that includes the current date.
      //It changes the button text from "Add Answer" to "Save Answer" after the user inputs their response.
      //It closes the popup when the user clicks the "Add Answer" button after entering their response.

      // Daily Prompt function
      document.addEventListener('DOMContentLoaded', function () {
          const prompts = [
              "What's the best thing that happened to you today?",
              "Write about a place you would love to visit someday.",
              "Describe your favorite hobby and why you love it.",
              "What's a fond childhood memory that makes you smile?",
              "Who made a positive impact on your life recently?",
              "How do you like to relax?",
              "What's a compliment that meant a lot to you?",
              // Add as many as we like
          ];

          function getTodaysDate() {
              const today = new Date();
              return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
          }

          function showDailyPrompt() {
              const promptText = document.getElementById('daily-prompt');
              const inputResponse = document.querySelector('.input-response');
              const addAnswerBtn = document.getElementById('add-answer-btn');
              const savedAnswerKey = 'dailyPromptAnswer-' + getTodaysDate();

              let todaysPrompt = localStorage.getItem('dailyPrompt-' + getTodaysDate());
              if (!todaysPrompt) {
                  const randomIndex = Math.floor(Math.random() * prompts.length);
                  todaysPrompt = prompts[randomIndex];
                  localStorage.setItem('dailyPrompt-' + getTodaysDate(), todaysPrompt);
              }
              promptText.textContent = todaysPrompt;

              // Retrieve the saved answer if it exists
              let savedAnswer = localStorage.getItem(savedAnswerKey);
              inputResponse.value = savedAnswer || '';
              addAnswerBtn.textContent = savedAnswer ? 'Save Answer' : 'Add Answer';

              document.querySelector('.popup-container').classList.add('active'); // Show the popup
          }

          // Add Answer Button
          const addAnswerBtn = document.getElementById('add-answer-btn');
          const inputResponse = document.querySelector('.input-response');

          addAnswerBtn.addEventListener('click', function () {
              const savedAnswerKey = 'dailyPromptAnswer-' + getTodaysDate();
              localStorage.setItem(savedAnswerKey, inputResponse.value);
              addAnswerBtn.textContent = 'Save Answer';
              document.querySelector('.popup-container').classList.remove('active');
          });

          // Daily Prompt Link Click
          document.getElementById('daily-prompt-link').addEventListener('click', showDailyPrompt);

          // Close Button Click
          document.querySelector('.close-btn').addEventListener('click', function () {
              document.querySelector('.popup-container').classList.remove('active'); // Hide the popup
          });
      });

      //---------------------------------------------------------------------------------------------------------

      // Function to save entry
      /**function saveEntry() {
          const dateValue = document.querySelector('#date').value;
          const titleValue = document.querySelector('#title').value;
          const textValue = document.querySelector('#entry').value;
          const imageUrl = document.querySelector('.image-preview').style.backgroundImage;

          // Call the function to append the new entry
          appendNewEntry(dateValue, titleValue, textValue, imageUrl);

          // Clear the form and hide the image preview
          entryForm.reset();
          const imagePreview = document.querySelector('.image-preview');
          imagePreview.style.backgroundImage = '';
          imagePreview.style.display = 'none';
      }

      // Event listener for the submit button
      submitButton.addEventListener('click', function () {
          saveEntry();
      });***/

      //Function to auto-Save the Data, this would involve sending the data to a server using AJAX
      let lastSavedTitle = '';
      let lastSavedEntry = '';
      let autoSaveTimeout = null;
      const autoSaveInterval = 2000; // 2 seconds


      function saveJournalEntry() {
          const title = document.getElementById('title').value;
          const entry = document.getElementById('entry').value;


          // Check if the data has changed
          if (title === lastSavedTitle && entry === lastSavedEntry) {
              console.log('No changes to save.');
              return; // No need to save as the data is the same
          }


          // Update last saved data
          lastSavedTitle = title;
          lastSavedEntry = entry;


          //Send this data to a server here
          console.log('Saving entry:', {
              title,
              entry
          });
      }


      document.querySelectorAll('#title, #entry').forEach(element => {
          element.addEventListener('input', () => {
              if (autoSaveTimeout !== null) {
                  clearTimeout(autoSaveTimeout);
              }
              autoSaveTimeout = setTimeout(() => {
                  saveJournalEntry();
              }, autoSaveInterval);
          });
      });
      // If we plan to use this in production,
      //replace the console.log statement with actual code to save data to a server or local storage.

      //dark mode function
      document.addEventListener('DOMContentLoaded', function () {
          var checkbox = document.getElementById('dark-mode-toggle');
          var label = document.querySelector('.dark-mode-label');

          checkbox.addEventListener('change', function () {
              label.classList.toggle('active', this.checked);
              document.body.setAttribute('data-theme', this.checked ? 'dark' : 'light');
          });
      });