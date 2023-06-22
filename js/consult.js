        <div id="mood" data-w-tab="tabMood" class="w-tab-pane">
          <div id="phq2-form" class="w-container">
            <div id="phq2-form-block" class="form">
              <form id="wf-form-phq2-form-block" name="wf-form-phq2-form-block" data-name="phq2-form-block" method="get">
                <h3 class="heading-3">PHQ2 Form</h3>
                <div id="phq-q1" class="phq2-question">
                  <h5 class="heading-5">Question 1</h5>
                  <p class="paragraph-3">During the last month, have you often been bothered by feeling down, depressed or hopeless?</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="phq2-q1-Yes" name="phq2-q1" value="1" data-name="phq2-q1" required="required" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="Yes">Yes</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="phq2-q1-No" name="phq2-q1" value="0" data-name="phq2-q1" required="required" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="No">No</span>
                  </label>
                </div>
                <div id="phq-q2" class="phq2-question">
                  <h5 class="heading-5">Question 2</h5>
                  <p class="paragraph-3">During the last month, have you often been bothered by having little interest or pleasure in doing things?</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="phq2-q2-Yes" name="phq-q2" value="1" data-name="phq-q2" required="required" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="Yes-2">Yes</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="phq2-q2-No" name="phq-q2" value="0" data-name="phq-q2" required="required" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="No-2">No</span>
                  </label>
                </div>
                <!-- <label><input id="submit-phq2-form" type="submit">Submit</label> -->
                <a id="submit-phq2-form" href="#" class="consult-submit w-button" onclick="submitFormPHQ2('USERNAME')">Submit</a> <!--Submit form to database (?), activate either PHQ9 or Picture Grid-->
              </form>
            </div>  
          </div>
          <div id="phq9-form" class="w-container">
            <div id="phq9-form-block" class="form">
              <form id="wf-form-phq9-form-block" name="wf-form-phq9-form-block" data-name="phq9-form-block" method="get">
                <h3 class="heading-3">Patient Health Questionnaire (PHQ-9)</h3>
                <h5 class="heading-5">Over the last <em>2 weeks</em>, how ofter have you been bothered by any of the following problems?</h5>
                <div id="phq9-form-1to9-block" class="form">
                <div id="phq9-q1" class="phq9-question">
                  <p class="paragraph-3"><strong>1. </strong>Little interest or pleasure in doing things</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="1-0" name="phq9-q1" value="0" data-name="phq9-q1" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="1-1" name="phq9-q1" value="1" data-name="phq9-q1" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="1-2" name="phq9-q1" value="2" data-name="phq9-q1" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="1-3" name="phq9-q1" value="3" data-name="phq9-q1" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q2" class="phq9-question">
                  <p class="paragraph-3"><strong>2. </strong>Feeling down, depressed, or hopeless</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="2-0" name="phq9-q2" value="0" data-name="phq9-q2" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="2-1" name="phq9-q2" value="1" data-name="phq9-q2" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="2-2" name="phq9-q2" value="2" data-name="phq9-q2" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="2-3" name="phq9-q2" value="3" data-name="phq9-q2" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q3" class="phq9-question">
                  <p class="paragraph-3"><strong>3. </strong>Trouble falling or staying aleep, or sleeping too much</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="3-0" name="phq9-q3" value="0" data-name="phq9-q3" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="3-1" name="phq9-q3" value="1" data-name="phq9-q3" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="3-2" name="phq9-q3" value="2" data-name="phq9-q3" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="3-3" name="phq9-q3" value="3" data-name="phq9-q3" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q4" class="phq9-question">
                  <p class="paragraph-3"><strong>4. </strong>Feeling tired or having little energy</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="4-0" name="phq9-q4" value="0" data-name="phq9-q4" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="4-1" name="phq9-q4" value="1" data-name="phq9-q4" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="4-2" name="phq9-q4" value="2" data-name="phq9-q4" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="4-3" name="phq9-q4" value="3" data-name="phq9-q4" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q5" class="phq9-question">
                  <p class="paragraph-3"><strong>5. </strong>Poor appetite or overeating</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="5-0" name="phq9-q5" value="0" data-name="phq9-q5" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="5-1" name="phq9-q5" value="1" data-name="phq9-q5" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="5-2" name="phq9-q5" value="2" data-name="phq9-q5" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="5-3" name="phq9-q5" value="3" data-name="phq9-q5" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q6" class="phq9-question">
                  <p class="paragraph-3"><strong>6. </strong>Feeling bad about yourself - or that you are a failure or have let yourself or your family down</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="6-0" name="phq9-q6" value="0" data-name="phq9-q6" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="6-1" name="phq9-q6" value="1" data-name="phq9-q6" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="6-2" name="phq9-q6" value="2" data-name="phq9-q6" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="6-3" name="phq9-q6" value="3" data-name="phq9-q6" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q7" class="phq9-question">
                  <p class="paragraph-3"><strong>7. </strong>Trouble concentrating on things, such as reading the newspaper or watching television</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="7-0" name="phq9-q7" value="0" data-name="phq9-q7" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="7-1" name="phq9-q7" value="1" data-name="phq9-q7" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="7-2" name="phq9-q7" value="2" data-name="phq9-q7" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="7-3" name="phq9-q7" value="3" data-name="phq9-q7" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q8" class="phq9-question">
                  <p class="paragraph-3"><strong>8. </strong>Moving or speaking so slowly that other peope could have noticed. Or the opposite - being so figety or restless that you have been moving around a lot more than usual</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="8-0" name="phq9-q8" value="0" data-name="phq9-q8" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="8-1" name="phq9-q8" value="1" data-name="phq9-q8" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="8-2" name="phq9-q8" value="2" data-name="phq9-q8" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="8-3" name="phq9-q8" value="3" data-name="phq9-q8" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                <div id="phq9-q9" class="phq9-question">
                  <p class="paragraph-3"><strong>9. </strong>Thoughts that you would be better off dead, or ofhurting yourself</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="9-0" name="phq9-q9" value="0" data-name="phq9-q9" required="" class="w-form-formradioinput w-radio-input" onclick="checkForPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="0">Not at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="9-1" name="phq9-q9" value="1" data-name="phq9-q9" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="1">Several days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="9-2" name="phq9-q9" value="2" data-name="phq9-q9" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="2">More than half the days</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="9-3" name="phq9-q9" value="3" data-name="phq9-q9" required="" class="w-form-formradioinput w-radio-input" onclick="showPhq9Q10()">
                    <span class="radio-button-label w-form-label" for="3">Nearly every day</span>
                  </label>
                </div>
                </div>
                <div id="phq9-q10" class="phq9-question">
                  <p class="paragraph-3"><strong>10.</strong> If you checked off <em>any problems</em>, how <em>difficult</em> have these problems made it for you to do your work, take care of things at home, or get along with other people?</p>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="10-0" name="phq9-q10" value="Not difficult at all" data-name="phq9-q10" required="" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="0">Not difficult at all</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="10-1" name="phq9-q10" value="Somewhat difficult" data-name="phq9-q10" required="" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="1">Somewhat difficult</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="10-2" name="phq9-q10" value="Very difficult" data-name="phq9-q10" required="" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="2">Very difficult</span>
                  </label>
                  <label class="radio-button-field w-radio">
                    <input type="radio" id="10-3" name="phq9-q10" value="Extremely difficult" data-name="phq9-q10" required="" class="w-form-formradioinput w-radio-input">
                    <span class="radio-button-label w-form-label" for="3">Extremely difficult</span>
                  </label>
                </div>
                <a id="submitt-phq9-form" href="#" class="consult-submit w-button" onclick="submitFormPHQ9('USERNAME')">Submit</a>
                <!-- Button NEED SUBMIT FUNCTION -->
              </form>
              <!-- <div id="phq2-form-block-suc" class="success-message w-form-done">
                <div class="text-block-12">Answers to PHQ-9 Form is submitted.</div>
                <a href="#mood-grid" class="button-2 w-button">Confirm</a>
              </div>
              <div id="phq2-form-block-fail" class="w-form-fail">
                <div class="text-block-11">You need to answer all the questions in this form.</div>
              </div> -->
            </div>
          </div>
          <div id="mood-grid" class="w-container">
            <h1 class="heading-3">Which image best represents your current MOOD?</h1>
            <div class="w-row">
              <div class="column w-col w-col-3">
                <div class="div-block-6">
                  <img id="mood-1-afraid" width="135" loading="lazy" src="images/1_3.jpg" alt="" class="image" onclick="confirmWindow('USERNAME')">
                  <img id="mood-5-frustrated" width="135" loading="lazy" src="images/5_2.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-9-miserable" width="136" loading="lazy" src="images/9_3.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-13-gloomy" width="135" loading="lazy" src="images/13_3.jpg" alt="" onclick="confirmWindow('USERNAME')">
                </div>
              </div>
              <div class="w-col w-col-3">
                <div class="div-block-6">
                  <img id="mood-2-tense" width="135" loading="lazy" src="images/2_1.jpg" alt="" class="image" onclick="confirmWindow('USERNAME')">
                  <img id="mood-6-angry" width="136" loading="lazy" src="images/6_3.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-10-sad" width="136" loading="lazy" src="images/10_1.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-14-tired" width="136" loading="lazy" src="images/13_1.jpg" alt="" onclick="confirmWindow('USERNAME')">
                </div>
              </div>
              <div class="w-col w-col-3">
                <div class="div-block-6">
                  <img id="mood-3-excited" width="135" loading="lazy" src="images/3_1.jpg" alt="" class="image" onclick="confirmWindow('USERNAME')">
                  <img id="mood-7-happy" width="136" loading="lazy" src="images/7_3.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-11-calm" width="136" loading="lazy" src="images/11_1.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-15-sleepy" width="136" loading="lazy" src="images/15_3.jpg" alt="" onclick="confirmWindow('USERNAME')">
                </div>
              </div>
              <div class="w-col w-col-3">
                <div class="div-block-6">
                  <img id="mood-4-delighted" width="135" loading="lazy" src="images/4_1.jpg" alt="" class="image" onclick="confirmWindow('USERNAME')">
                  <img id="mood-8-glad" width="136" loading="lazy" src="images/8_1.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-12-satisfied" width="136" loading="lazy" src="images/12_2.jpg" alt="" onclick="confirmWindow('USERNAME')">
                  <img id="mood-16-serene" width="136" loading="lazy" src="images/16_1.jpg" alt="" onclick="confirmWindow('USERNAME')">
                </div>
              </div>
            </div>
          </div>
        </div>
