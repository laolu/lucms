import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSettings } from "@/components/admin/email-settings";
import { SmsSettings } from "@/components/admin/sms-settings";
import { SecuritySettings } from "@/components/admin/security-settings";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>
      
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="email">邮件配置</TabsTrigger>
          <TabsTrigger value="sms">短信配置</TabsTrigger>
          <TabsTrigger value="security">安全配置</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <EmailSettings />
        </TabsContent>

        <TabsContent value="sms">
          <SmsSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
} 