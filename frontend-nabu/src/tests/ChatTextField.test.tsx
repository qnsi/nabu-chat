import React from "react";
import {shallow, mount, render} from "enzyme"
import ChatTextField from "../components/ChatTextField";


function newMessage() {
  // setMessages((state) => {
  //   return state.concat([message])
  // })
}

describe("A suite" , () => {
  // it("should render without an error", () => {
  //   expect(shallow(<ChatTextField newMessage={newMessage}/>).contains(<div className="chat-text-field"></div>)).toBe(true);
  // })
  it("jest runs", () => {
    expect(2).toBe(2);
  })
})