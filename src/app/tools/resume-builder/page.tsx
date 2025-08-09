// src/app/tools/resume-builder/page.tsx
'use client';

import { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Trash2, Printer, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const experienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string(),
  description: z.string(),
});

const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  year: z.string().min(1, 'Year is required'),
});

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string(),
  summary: z.string(),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  skills: z.string(),
});

type ResumeFormValues = z.infer<typeof formSchema>;

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeFormValues | null>(null);

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      summary: '',
      experiences: [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
      educations: [{ degree: '', institution: '', year: '' }],
      skills: '',
    },
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  const onSubmit: SubmitHandler<ResumeFormValues> = (data) => {
    setResumeData(data);
  };
  
  const handlePrint = () => {
    const printContent = document.getElementById('resume-preview');
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = 'Print' + uniqueName;
    const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');
    
    if(printWindow && printContent) {
        printWindow.document.write('<html><head><title>Resume</title>');
        printWindow.document.write('<link rel="stylesheet" href="/resume-print.css" type="text/css" />');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for styles to load before printing
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>Fill in your details to generate a professional resume.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Details</h3>
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="summary" render={({ field }) => (
                      <FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <Separator />

                  {/* Work Experience */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                    {experienceFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                        <FormField control={form.control} name={`experiences.${index}.jobTitle`} render={({ field }) => (
                          <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`experiences.${index}.company`} render={({ field }) => (
                          <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name={`experiences.${index}.startDate`} render={({ field }) => (
                                <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`experiences.${index}.endDate`} render={({ field }) => (
                                <FormItem><FormLabel>End Date (or leave blank)</FormLabel><FormControl><Input type="month" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name={`experiences.${index}.description`} render={({ field }) => (
                          <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        {index > 0 && <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4" /></Button>}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendExperience({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
                  </div>
                  <Separator />

                  {/* Education */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Education</h3>
                    {educationFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
                        <FormField control={form.control} name={`educations.${index}.degree`} render={({ field }) => (
                            <FormItem><FormLabel>Degree / Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`educations.${index}.institution`} render={({ field }) => (
                            <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`educations.${index}.year`} render={({ field }) => (
                            <FormItem><FormLabel>Year of Completion</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        {index > 0 && <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4" /></Button>}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendEducation({ degree: '', institution: '', year: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
                  </div>
                  <Separator />

                  {/* Skills */}
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">Skills</h3>
                     <FormField control={form.control} name="skills" render={({ field }) => (
                        <FormItem><FormLabel>Skills (comma separated)</FormLabel><FormControl><Textarea {...field} placeholder="e.g., JavaScript, React, Project Management" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <Button type="submit" className="w-full">
                    <Eye className="mr-2 h-4 w-4" /> Preview Resume
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Resume Preview */}
          <div className="sticky top-24">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Resume Preview</CardTitle>
                        <CardDescription>This is how your resume will look.</CardDescription>
                    </div>
                    {resumeData && <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>}
                </CardHeader>
                <CardContent>
                    <div id="resume-preview" className="p-8 border rounded-lg bg-white text-black min-h-[50rem] text-sm">
                        {resumeData ? (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold">{resumeData.fullName}</h1>
                                    <p className="text-muted-foreground">{resumeData.email} | {resumeData.phoneNumber} | {resumeData.address}</p>
                                </div>
                                
                                {resumeData.summary && (
                                    <div>
                                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">Summary</h2>
                                        <p>{resumeData.summary}</p>
                                    </div>
                                )}

                                {resumeData.experiences[0]?.jobTitle && (
                                    <div>
                                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">Work Experience</h2>
                                        {resumeData.experiences.map((exp, i) => (
                                            <div key={i} className="mb-4">
                                                <h3 className="font-bold">{exp.jobTitle}</h3>
                                                <p className="italic">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                                                <p className="mt-1">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {resumeData.educations[0]?.degree && (
                                    <div>
                                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">Education</h2>
                                        {resumeData.educations.map((edu, i) => (
                                            <div key={i} className="mb-2">
                                                <h3 className="font-bold">{edu.degree}</h3>
                                                <p>{edu.institution} - {edu.year}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {resumeData.skills && (
                                    <div>
                                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">Skills</h2>
                                        <p>{resumeData.skills}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center text-center text-muted-foreground min-h-[40rem]">
                                <p>Fill out the form to see your resume preview.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
