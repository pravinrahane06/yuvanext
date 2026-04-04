import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, Send, ImagePlus, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const CreateActivity = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [subKeywords, setSubKeywords] = useState("");
  const [saving, setSaving] = useState(false);

  // Load existing activity for editing
  useQuery({
    queryKey: ["activity-edit", editId],
    queryFn: async () => {
      if (!editId) return null;
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", editId)
        .single();
      if (error) throw error;
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setShortDescription(data.short_description || "");
        setFullContent(data.full_content || "");
        setFeaturedImage(data.featured_image || "");
        setMetaTitle(data.meta_title || "");
        setMetaDescription(data.meta_description || "");
        setMetaKeywords(data.meta_keywords || "");
        setSubKeywords(data.sub_keywords || "");
      }
      return data;
    },
    enabled: !!editId,
  });

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editId) setSlug(generateSlug(val));
  };

  const handleSubmit = async (status: "published" | "draft") => {
    if (!title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title,
      slug,
      short_description: shortDescription,
      full_content: fullContent,
      featured_image: featuredImage,
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      sub_keywords: subKeywords,
      status,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("activities").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("activities").insert(payload));
    }
    setSaving(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: editId ? "Updated!" : status === "published" ? "Published!" : "Draft Saved!",
      description: `"${title}" saved successfully.`,
    });
    navigate("/admin-manage-activities");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin-manage-activities")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{editId ? "Edit" : "Create"} Activity</h2>
            <p className="text-muted-foreground text-sm">Add a new activity or blog post</p>
          </div>
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
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input id="featuredImage" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://example.com/image.jpg" />
              {!featuredImage && (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Enter image URL above</p>
                </div>
              )}
              {featuredImage && (
                <img src={featuredImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Short Description</Label>
              <Textarea id="desc" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Brief summary of the activity" rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="shadow-sm">
          <CardHeader><CardTitle className="text-lg">Content</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Full Article</Label>
              <Textarea id="content" value={fullContent} onChange={(e) => setFullContent(e.target.value)} placeholder="Write the full article content here..." rows={10} />
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
                <Input id="keywords" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="keyword1, keyword2" />
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
          <Button onClick={() => handleSubmit("published")} className="gap-2" disabled={saving}>
            <Send className="h-4 w-4" /> {editId ? "Update & Publish" : "Publish"}
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("draft")} className="gap-2" disabled={saving}>
            <Save className="h-4 w-4" /> Save Draft
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateActivity;
