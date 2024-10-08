import React from "react";
import Button from "./Button";
import Card from "./Card";
import Contacts from "../contacts";


function createCard(contact) {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      img={contact.imgURL}
      tel={contact.phone}
      mail={contact.email}
    />
  );
}

function Main() {
  return (
    
    <section id="features">

        <div class="container px-4">
            <h2 class="pb-2 border-bottom">My Link</h2>
            <div class="row row-cols-1 row-cols-lg-4">
                <div class="col d-flex align-items-start">
                    <div
                        class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="#000000" class="bi bi-laptop"
                            viewBox="0 0 16 16">
                            <path
                                d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="fs-2 text-body-emphasis">System</h3>
                        <a href="https://github.com/mukumuyi/MyGit/blob/main/StuduyMemo.ipynb"
                            class="btn btn-dark mt-1">
                            Study Memo
                        </a><br/>
                        <a href="https://github.com/mukumuyi/MyGit/tree/main" class="btn btn-dark mt-1">
                            Git
                        </a><br/>
                        <a href="https://codepen.io/mukumuyi/" class="btn btn-dark mt-1">
                            CodePen
                        </a><br/>
                        <a href="./10_system/18_html,css/timelinechart/timeline.html" class="btn btn-dark mt-1">
                            Timeline
                        </a>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div
                        class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg fill="#000000" height="30" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.003 512.003"
                            xml:space="preserve">
                            <g>
                                <g>
                                    <g>
                                        <path d="M115.553,111.477c3.53,5.71,9.639,8.851,15.893,8.851c3.349,0,6.741-0.902,9.798-2.792
                               c8.768-5.422,11.481-16.924,6.059-25.692c-4.07-6.581-2.097-15.818,1.636-30.247c4.012-15.504,9.004-34.8-1.456-52.446
                               c-5.255-8.867-16.7-11.795-25.573-6.54c-8.867,5.256-11.795,16.705-6.539,25.573c2.543,4.292-0.057,14.342-2.571,24.063
                               C108.348,69.454,102.807,90.867,115.553,111.477z" />
                                        <path d="M175.309,111.477c3.531,5.71,9.64,8.852,15.894,8.852c3.349,0,6.739-0.901,9.798-2.792
                               c8.768-5.42,11.481-16.923,6.06-25.69c-4.07-6.583-2.098-15.818,1.635-30.248c4.012-15.504,9.003-34.799-1.455-52.445
                               c-5.256-8.868-16.708-11.795-25.573-6.54c-8.868,5.256-11.796,16.705-6.541,25.572c2.545,4.292-0.056,14.343-2.571,24.063
                               C168.107,69.454,162.567,90.867,175.309,111.477z" />
                                        <path d="M20.116,319.151l16.915,111.033c0.095,0.62,0.142,1.246,0.142,1.874c0,21.267,15.558,38.961,35.889,42.321
                               L60.089,319.151H20.116z" />
                                        <path d="M98.084,474.962h50.826v-8.531c-5.184-8.891-9.502-18.424-12.777-28.531c-4.278-13.212-1.956-27.805,6.21-39.032
                               c1.927-2.649,4.14-5.036,6.566-7.154v-72.563H85.062L98.084,474.962z" />
                                        <path
                                            d="M177.566,380.931h54.917l5.163-61.78h-63.85v61.964C175.045,381.005,176.301,380.931,177.566,380.931z" />
                                        <polygon
                                            points="257.456,380.931 293.178,380.931 302.591,319.151 262.619,319.151 			" />
                                        <path d="M317.286,222.685l4.063-26.667c1.035-6.8-0.942-13.694-5.424-18.911c-4.483-5.217-11-8.21-17.879-8.21h-22.87
                               l-4.436,53.073h40.342C313.187,221.97,315.267,222.219,317.286,222.685z" />
                                        <path d="M11.369,221.97h40.599l-4.436-53.074H24.661c-6.879,0-13.396,2.993-17.879,8.21c-4.482,5.217-6.459,12.111-5.424,18.911
                               l4.054,26.611C7.356,222.198,9.351,221.97,11.369,221.97z" />
                                        <polygon
                                            points="148.909,221.97 148.909,168.896 72.504,168.896 76.94,221.97 			" />
                                        <polygon
                                            points="173.796,221.97 245.768,221.97 250.203,168.896 173.796,168.896 			" />
                                        <path d="M507.478,155.619c-5.958-8.412-17.607-10.399-26.02-4.441c-3.872,2.745-92.818,67.68-125.256,253.397H179.245
                               c-5.972,0-11.583,2.857-15.095,7.688c-3.513,4.829-4.502,11.047-2.663,16.729c16.082,49.651,61.964,83.012,114.171,83.012
                               c52.049,0,97.811-33.161,114.022-82.564c0.416-1.178,0.716-2.411,0.887-3.683c4.477-29.47,10.464-55.717,17.266-78.947
                               c15.009-51.254,33.993-87.806,49.506-111.801c3.032-4.69,6.016-9.038,8.918-13.058c20.382-28.238,36.669-40.232,36.78-40.311
                               C511.449,175.68,513.436,164.03,507.478,155.619z" />
                                        <path
                                            d="M301.194,304.576c6.696,0,12.346-4.977,13.192-11.618l5.326-41.842c1.012-7.946-5.18-14.977-13.191-14.977H16.185
                               c-8.01,0-14.203,7.03-13.191,14.977l5.326,41.842c0.845,6.641,6.497,11.618,13.191,11.618H301.194z" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <h3 class="fs-2 text-body-emphasis">Saunner</h3>
                        <a href="https://sauna-ikitai.com/saunners/229860" class="btn btn-dark mt-1">
                            サウナイキタイ
                        </a><br/>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div
                        class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="#000000" class="bi bi-book"
                            viewBox="0 0 16 16">
                            <path
                                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="fs-2 text-body-emphasis">Student</h3>
                        <a href="https://bookmeter.com/users/1421272" class="btn btn-dark">
                            読書メーター
                        </a>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div
                        class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="#000000"
                            class="bi bi-airplane-engines" viewBox="0 0 16 16">
                            <path
                                d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="fs-2 text-body-emphasis">Traveler</h3>
                        <a href="https://maps.app.goo.gl/YQMDWfem65kwpKdQ9" class="btn btn-dark">
                            旅行メモ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Main;
