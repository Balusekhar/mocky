'use client'

import {useState} from 'react'
import Webcam from "react-webcam";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Camera, Info, TriangleAlert} from "lucide-react";

export default function Component() {

  const [webcamEnabled, setWebcamEnabled] = useState(false)

  // const requestCameraPermission = async () => {
  //   try {
  //
  //   } catch (err) {
  //     console.error("Error accessing camera:", err)
  //   }
  // }

  // const handleStartInterview = async () => {
  //   if (!cameraPermission) {
  //     await requestCameraPermission()
  //   } else {
  //     // Logic to start the interview
  //     console.log("Starting interview...")
  //   }
  // }

  return (
    <div className="flex-1 h-full">
      <div className="h-full p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Interview Setup:</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Interview Details</h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Please provide details for your mock interview
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Input id="role" placeholder="e.g. Frontend Developer"/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <Info className="h-5 w-5 text-gray-400 mt-0.5"/>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Privacy Notice</h3>
                  <p className="text-sm text-gray-500">
                    Your video feed is not stored in our database. It is only used for real-time interaction during the
                    interview.
                  </p>
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-black text-white hover:bg-gray-800"
                // onClick={handleStartInterview}
              >
                Start Interview
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Video Preview</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWebcamEnabled(!webcamEnabled)}
                className="text-gray-500 hover:text-gray-700"
              >
                {webcamEnabled ? (
                  <Camera className="h-6 w-6"/>
                ) : (
                  <TriangleAlert className="h-32 w-32 text-red-600"/>
                )}

              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {webcamEnabled ? (
                <Webcam mirrored={true} className="w-full"/>
              ) : (
                <Camera className="h-12 w-12 text-gray-400"/>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}