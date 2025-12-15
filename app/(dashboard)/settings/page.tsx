'use client';

import { useState } from 'react';
import { Save, User, Bell, Lock, Trash2 } from 'lucide-react';

interface Settings {
  email: string;
  name: string;
  company: string;
  notifications_email: boolean;
  notifications_push: boolean;
  notifications_sms: boolean;
  language: 'pt-BR' | 'en';
  timezone: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    email: 'usuario@example.com',
    name: 'João Silva',
    company: 'Manutenção XYZ',
    notifications_email: true,
    notifications_push: true,
    notifications_sms: false,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 500));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const SettingSection = ({
    icon: Icon,
    title,
    description,
    children,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-2 bg-blue-900/30 border border-blue-700 rounded-lg">
          <Icon size={24} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const InputField = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
      />
    </div>
  );

  const ToggleField = ({
    label,
    description,
    value,
    onChange,
  }: {
    label: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-100">{label}</p>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
          value ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  const SelectField = ({
    label,
    value,
    onChange,
    options,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-100">Configurações</h2>
        <p className="text-gray-400 mt-2">Gerencie suas preferências e informações de conta.</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-900/20 border border-green-700 text-green-400 px-4 py-3 rounded-lg">
          Configurações salvas com sucesso!
        </div>
      )}

      {/* Profile Section */}
      <SettingSection
        icon={User}
        title="Informações de Perfil"
        description="Atualize suas informações pessoais e profissionais"
      >
        <InputField
          label="Nome Completo"
          value={settings.name}
          onChange={(value) => handleInputChange('name', value)}
          placeholder="Digite seu nome"
        />
        <InputField
          label="Email"
          type="email"
          value={settings.email}
          onChange={(value) => handleInputChange('email', value)}
          placeholder="seu@email.com"
        />
        <InputField
          label="Empresa"
          value={settings.company}
          onChange={(value) => handleInputChange('company', value)}
          placeholder="Nome da sua empresa"
        />
      </SettingSection>

      {/* Notifications Section */}
      <SettingSection
        icon={Bell}
        title="Notificações"
        description="Controle como você recebe notificações"
      >
        <ToggleField
          label="Notificações por Email"
          description="Receba atualizações importantes por email"
          value={settings.notifications_email}
          onChange={(value) => handleInputChange('notifications_email', value)}
        />
        <div className="border-t border-gray-700" />
        <ToggleField
          label="Notificações Push"
          description="Receba notificações no navegador"
          value={settings.notifications_push}
          onChange={(value) => handleInputChange('notifications_push', value)}
        />
        <div className="border-t border-gray-700" />
        <ToggleField
          label="Notificações por SMS"
          description="Receba alertas críticos por SMS"
          value={settings.notifications_sms}
          onChange={(value) => handleInputChange('notifications_sms', value)}
        />
      </SettingSection>

      {/* Preferences Section */}
      <SettingSection
        icon={Lock}
        title="Preferências"
        description="Personalize sua experiência"
      >
        <SelectField
          label="Idioma"
          value={settings.language}
          onChange={(value) => handleInputChange('language', value)}
          options={[
            { value: 'pt-BR', label: 'Português (Brasil)' },
            { value: 'en', label: 'English' },
          ]}
        />
        <SelectField
          label="Fuso Horário"
          value={settings.timezone}
          onChange={(value) => handleInputChange('timezone', value)}
          options={[
            { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)' },
            { value: 'America/Rio_Branco', label: 'Rio Branco (UTC-5)' },
            { value: 'America/New_York', label: 'New York (UTC-5)' },
          ]}
        />
      </SettingSection>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          <Save size={20} />
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold py-2 px-6 rounded-lg transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  );
}
