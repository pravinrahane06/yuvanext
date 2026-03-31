import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { Save, Send, ImagePlus } from "lucide-react";

const CreateActivity = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [subKeywords, setSubKeywords] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(generateSlug(val));
  };

  const handleSubmit = (status: "published" | "draft") => {
    if (!title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }
    toast({
      title: status === "published" ? "Activity Published!" : "Draft Saved!",
      description: `"${title}" has been ${status === "published" ? "published" : "saved as draft"} successfully.`,
    });
    // Reset form
    setTitle(""); setSlug(""); setDescription(""); setContent("");
    setMetaTitle(""); setMetaDescription(""); setKeywords(""); setSubKeywords("");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Create Activity</h2>
          <p className="text-muted-foreground text-sm">Add a new activity or blog post</p>
        </div>

        {/* Basic Info */}
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="text-lg">Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Enter activity title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated-slug" className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label>Feature Image</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Short Description</Label>
              <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of the activity" rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="text-lg">Content</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Full Article</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write the full article content here..." rows={10} />
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="text-lg">SEO Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (max 60 chars)" maxLength={60} />
              <p className="text-xs text-muted-foreground">{metaTitle.length}/60 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDesc">Meta Description</Label>
              <Textarea id="metaDesc" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (max 160 chars)" rows={2} maxLength={160} />
              <p className="text-xs text-muted-foreground">{metaDescription.length}/160 characters</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Meta Keywords</Label>
                <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subKeywords">Sub Keywords</Label>
                <Input id="subKeywords" value={subKeywords} onChange={(e) => setSubKeywords(e.target.value)} placeholder="sub keyword1, sub keyword2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => handleSubmit("published")} className="gap-2">
            <Send className="h-4 w-4" /> Publish
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("draft")} className="gap-2">
            <Save className="h-4 w-4" /> Save Draft
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateActivity;
