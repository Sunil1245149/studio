// src/app/tools/biodata-maker/page.tsx
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { ArrowLeft, Printer, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const formSchema = z.object({
  purpose: z.string().min(1, 'Purpose is required'),
  fullName: z.string().min(2, 'Full name is required.'),
  fatherName: z.string().min(2, 'Father\'s name is required.'),
  dob: z.string().min(1, 'Date of birth is required'),
  height: z.string().min(1, 'Height is required'),
  religion: z.string().min(1, 'Religion is required'),
  caste: z.string(),
  education: z.string().min(1, 'Education is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  address: z.string().min(1, 'Address is required'),
  contactNumber: z.string().min(10, 'Please enter a valid phone number.'),
  photo: z.any().optional(),
});

type BiodataFormValues = z.infer<typeof formSchema>;

export default function BiodataMakerPage() {
  const [biodata, setBiodata] = useState<BiodataFormValues | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<BiodataFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: 'Marriage',
      fullName: '',
      fatherName: '',
      dob: '',
      height: '',
      religion: '',
      caste: '',
      education: '',
      occupation: '',
      address: '',
      contactNumber: '',
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<BiodataFormValues> = (data) => {
    setBiodata(data);
  };
  
  const handlePrint = () => {
    window.print();
  }

  const BiodataPreview = ({ data, photo }: { data: BiodataFormValues, photo: string | null }) => (
    <div className="font-serif p-8 border-2 border-primary rounded-lg bg-background text-foreground">
      <h1 className="text-4xl text-center font-bold text-primary mb-2 tracking-wider">{data.purpose === 'Marriage' ? 'Matrimonial Biodata' : 'Biodata'}</h1>
      <Separator className="bg-primary/50 mb-8" />

      {photo && (
        <div className="flex justify-center mb-8">
            <Image src={photo} alt="User photo" width={150} height={150} className="rounded-full border-4 border-primary/50 shadow-lg" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-lg">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Full Name:</span>
          <span>{data.fullName}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Father's Name:</span>
          <span>{data.fatherName}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Date of Birth:</span>
          <span>{data.dob}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Height:</span>
          <span>{data.height}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Religion:</span>
          <span>{data.religion}</span>
        </div>
         <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Caste:</span>
          <span>{data.caste || 'N/A'}</span>
        </div>
         <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Education:</span>
          <span>{data.education}</span>
        </div>
         <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Occupation:</span>
          <span>{data.occupation}</span>
        </div>
         <div className="flex justify-between border-b pb-2 col-span-1 md:col-span-2">
          <span className="font-semibold">Address:</span>
          <span className="text-right">{data.address}</span>
        </div>
         <div className="flex justify-between border-b pb-2 col-span-1 md:col-span-2">
          <span className="font-semibold">Contact Number:</span>
          <span className="text-right">{data.contactNumber}</span>
        </div>
      </div>
       <p className="text-center text-sm text-muted-foreground mt-8">
        This biodata was generated using Tools Hub Express.
      </p>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4 print:hidden">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="print:hidden">
            <CardHeader>
              <CardTitle>Biodata Maker</CardTitle>
              <CardDescription>Create a biodata for marriage or a job application.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="purpose" render={({ field }) => (
                    <FormItem><FormLabel>Purpose</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Separator/>
                   <FormField control={form.control} name="photo" render={({ field }) => (
                    <FormItem><FormLabel>Photo (Optional)</FormLabel><FormControl><Input type="file" accept="image/*" onChange={handlePhotoChange} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Separator/>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="fatherName" render={({ field }) => (
                    <FormItem><FormLabel>Father's Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="height" render={({ field }) => (
                        <FormItem><FormLabel>Height (e.g., 5' 10")</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="religion" render={({ field }) => (
                        <FormItem><FormLabel>Religion</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="caste" render={({ field }) => (
                        <FormItem><FormLabel>Caste (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                   <Separator/>
                   <h3 className="text-lg font-semibold">Education & Career</h3>
                     <FormField control={form.control} name="education" render={({ field }) => (
                        <FormItem><FormLabel>Highest Education</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="occupation" render={({ field }) => (
                        <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <Separator/>
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Full Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="contactNumber" render={({ field }) => (
                    <FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <Button type="submit" className="w-full">
                    <Eye className="mr-2 h-4 w-4" /> Preview Biodata
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="sticky top-24">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between print:hidden">
                    <div>
                        <CardTitle>Biodata Preview</CardTitle>
                        <CardDescription>This is how your biodata will look.</CardDescription>
                    </div>
                    {biodata && <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>}
                </CardHeader>
                <CardContent>
                    <div id="biodata-preview">
                        {biodata ? (
                            <BiodataPreview data={biodata} photo={photoPreview} />
                        ) : (
                            <div className="flex items-center justify-center text-center text-muted-foreground min-h-[40rem]">
                                <p>Fill out the form and click "Preview Biodata" to see your document here.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
           </div>
        </div>
      </main>
      <Footer className="print:hidden"/>
    </div>
  );
}

// Add a print-specific stylesheet or style block if needed
// For now, we can hide elements with `print:hidden` utility class from Tailwind.
