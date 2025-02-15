'use client'

import * as React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCw, Send } from 'lucide-react'
import { settingService, type SystemConfig } from '@/services/setting'

export default function EmailSettingsPage() {
  const { toast } = useToast()
  const [configs, setConfigs] = React.useState<SystemConfig[]>([])
  const [loading, setLoading] = React.useState(false)
  const [testingEmail, setTestingEmail] = React.useState(false)

  // 获取配置
  const fetchConfigs = async () => {
    try {
      setLoading(true)
      const emailConfigs = await settingService.getEmailConfigs()
      setConfigs(emailConfigs)
    } catch (error) {
      console.error('获取配置失败:', error)
      toast({
        variant: "destructive",
        title: "错误",
        description: "获取配置失败"
      })
    } finally {
      setLoading(false)
    }
  }

  // 保存配置
  const saveConfig = async (key: string, value: string) => {
    try {
      await settingService.updateConfig(key, value)
      toast({
        title: "成功",
        description: "保存成功"
      })
    } catch (error) {
      console.error('保存配置失败:', error)
      toast({
        variant: "destructive",
        title: "错误",
        description: "保存失败"
      })
    }
  }

  // 测试邮件配置
  const testEmailConfig = async () => {
    try {
      setTestingEmail(true)
      await settingService.testEmailConfig()
      toast({
        title: "成功",
        description: "测试邮件已发送"
      })
    } catch (error) {
      console.error('测试邮件发送失败:', error)
      toast({
        variant: "destructive",
        title: "错误",
        description: "测试邮件发送失败"
      })
    } finally {
      setTestingEmail(false)
    }
  }

  // 渲染配置表单项
  const renderConfigField = (config: SystemConfig) => {
    const handleChange = (value: string) => {
      const newConfigs = configs.map(c => {
        if (c.key === config.key) {
          return { ...c, value }
        }
        return c
      })
      setConfigs(newConfigs)
    }

    const handleBlur = () => {
      saveConfig(config.key, config.value)
    }

    switch (config.type) {
      case 'boolean':
        return (
          <Select
            value={config.value}
            onValueChange={(value) => {
              handleChange(value)
              saveConfig(config.key, value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="请选择" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">是</SelectItem>
              <SelectItem value="false">否</SelectItem>
            </SelectContent>
          </Select>
        )
      case 'text':
        return (
          <Textarea
            value={config.value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            rows={3}
          />
        )
      default:
        return (
          <Input
            type="text"
            value={config.value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        )
    }
  }

  // 获取指定厂家的配置
  const getProviderConfigs = (provider: string) => {
    return configs.filter(config => config.key.startsWith(`email.${provider}.`))
  }

  React.useEffect(() => {
    fetchConfigs()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RotateCw className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">邮件设置</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={testEmailConfig}
            disabled={testingEmail}
          >
            <Send className={`mr-2 h-4 w-4 ${testingEmail ? 'animate-pulse' : ''}`} />
            发送测试邮件
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchConfigs()}
            disabled={loading}
          >
            <RotateCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
        </div>
      </div>

      <Tabs defaultValue="smtp">
        <TabsList>
          <TabsTrigger value="smtp">SMTP</TabsTrigger>
          <TabsTrigger value="aliyun">阿里云</TabsTrigger>
          <TabsTrigger value="tencent">腾讯云</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp">
          <Card>
            <CardContent className="space-y-4 pt-6">
              {getProviderConfigs('smtp').map((config) => (
                <div key={config.key} className="grid gap-2">
                  <Label>{config.description}</Label>
                  {renderConfigField(config)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aliyun">
          <Card>
            <CardContent className="space-y-4 pt-6">
              {getProviderConfigs('aliyun').map((config) => (
                <div key={config.key} className="grid gap-2">
                  <Label>{config.description}</Label>
                  {renderConfigField(config)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tencent">
          <Card>
            <CardContent className="space-y-4 pt-6">
              {getProviderConfigs('tencent').map((config) => (
                <div key={config.key} className="grid gap-2">
                  <Label>{config.description}</Label>
                  {renderConfigField(config)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 